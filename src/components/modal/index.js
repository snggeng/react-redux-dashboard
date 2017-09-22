import React, { Component } from 'react'
import firebase from 'firebase'
import { connect } from 'react-redux'
import { storageRef } from '../../config/constants'

// Action Creators
import { updateFurnitureFields, furnitureSubmit } from '../../actions/furnitureActions'

// UI
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import ChipInput from 'material-ui-chip-input'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'


// GridList styling
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
}

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

const formatFurniture = (furniture) => {
  return {
    title: furniture.title,
    description: furniture.description,
    itemNo: furniture.itemNo,
    brand: furniture.brand,
    supplier: furniture.supplier,
    color: furniture.color,
    material: furniture.material,
    location: furniture.location,
    vendor: furniture.vendor,
    vendorItemNo: furniture.vendorItemNo,
    length: furniture.length,
    width: furniture.width,
    height: furniture.height,
    price: furniture.price,
    available: furniture.available,
    tags: furniture.tags,
    type: furniture.type,
    quantity: furniture.quantity,
    condition: furniture.condition,
    alt: furniture.alt,
    adwordsGroup: furniture.adwordsGroup,
    adwordsLabel: furniture.adwordsLabel,
    images: furniture.images,
    timestamp: formatTimestamp(Date.now()),
  }
}

class AddModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      title: '',
      description: '',
      itemNo: '',
      brand: '',
      supplier: '',
      color: '',
      material: '',
      location: '',
      vendor: '',
      vendorItemNo: '',
      length: '',
      width: '',
      height: '',
      price: '',
      available: true,
      tags: [],
      type: '',
      quantity: '',
      condition: '', // out of 5
      alt: '',
      adwordsGroup: '',
      adwordsLabel: ''
    }
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  submitFurniture = () => {
    // update redux store
    this.props.updateFurnitureFields(this.state)
    // update firebase
    this.props.furnitureSubmit(formatFurniture(this.state))

    // close modal
    this.setState({
      open: false,
      title: '',
      description: '',
      itemNo: '',
      brand: '',
      supplier: '',
      color: '',
      material: '',
      location: '',
      vendor: '',
      vendorItemNo: '',
      length: '',
      width: '',
      height: '',
      price: '',
      available: true,
      tags: [],
      type: '',
      quantity: '',
      condition: '', // out of 5
      alt: '',
      adwordsGroup: '',
      adwordsLabel: ''
    })
  }
  // handle change for all inputs w string format
  handleOnChange = (e) => {
    let key = e.target.name
    this.setState({
      [key]: e.target.value
    })
  }
  // handle change for chip inputs
  handleAddChip = (chip) => {
    let state = this.state
    state.tags.push(chip)
    this.setState(state)
  }

  handleDeleteChip = (chip, index) => {
    let state = this.state
    state.tags.splice(index, 1)
    this.setState(state)
  }

  handleSelectField = (e, key ,payload) => {
    this.setState({
      condition: payload
    })
  }

  handleFiles = () => {
    let fileNode = document.getElementById('input')
    if (fileNode) {
      const files = fileNode.files
      // Create the file metadata
      let metadata = {
        contentType: 'image/jpeg'
      }
      // upload to firebase storage
      let uploadPromise = new Promise((resolve, reject) => {
        let promises = []
        for (let i = 0; i < files.length; i++) {
          // no duplicate image, start upload
          let uploadTask = storageRef.child(`images/${files[i].name}-${Date.now()}`).put(files[i], metadata)
            // Chain promises into an array to ensure synchronous return
            promises.push(new Promise((resolve, reject) => {
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            (snapshot) => {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              // console.log('Upload is ' + progress + '% done')
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                  // console.log('Upload is paused')
                  break
                case firebase.storage.TaskState.RUNNING: // or 'running'
                  // console.log('Upload is running')
                  break
                default:
                  return
              }
            }, (error) => {
              switch (error.code) {
                case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  console.log('no permission to access object', error)
                  break
                case 'storage/canceled':
                  // User canceled the upload
                  console.log('user cancelled upload', error)
                  break
                case 'storage/quota_exceeded':
                  // Exceeded storage quota
                  console.log('firebase storage quota exceeded', error)
                  break
                case 'storage/unknown':
                  // Unknown error occurred, inspect error.serverResponse
                  console.log('an unknown error occured', error)
                  break
                default:
                  return error
              }
            }, () => {
              // Upload completed successfully, now we can get the download URL
              let downloadURL = uploadTask.snapshot.downloadURL
              resolve(downloadURL)
            })
          }))
        }
        // Resolve array of promises and obtain result
        Promise.all(promises).then((results) => {
            // resolve promise
            resolve(results)
          })
        })
        uploadPromise.then((urls) => {
          // set url in state after upload
          // do not set state if no files uploaded
          if (urls.length > 0 ) {
            this.setState({
              images: urls
            })
          }
        })
      }
  }

  render() {
    const actions = [
      <FlatButton
        label='Cancel'
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label='Submit'
        primary={true}
        onTouchTap={this.submitFurniture}
      />,
    ];

    return (
      <div style={{padding: '5px 14px'}}>
        <RaisedButton label={this.props.label} onTouchTap={this.handleOpen} />
        <Dialog
          title={this.props.label}
          actions={actions}
          modal={true}
          open={this.state.open}
          autoScrollBodyContent={true}
        >
          <TextField
          name='title'
          value={this.state.title}
          hintText='Enter A Title'
          floatingLabelText='Title'
          floatingLabelFixed={true}
          fullWidth={true}
          onChange={this.handleOnChange}
          />
          <TextField
          name='description'
          value={this.state.description}
          hintText='Enter A Description'
          floatingLabelText='Description'
          floatingLabelFixed={true}
          fullWidth={true}
          onChange={this.handleOnChange}
          />
          <TextField
          name='itemNo'
          value={this.state.itemNo}
          hintText='Enter An Item Number'
          floatingLabelText='Item Number'
          floatingLabelFixed={true}
          fullWidth={true}
          onChange={this.handleOnChange}
          />
          <TextField
          name='brand'
          value={this.state.brand}
          hintText='Enter An Brand'
          floatingLabelText='Brand'
          floatingLabelFixed={true}
          fullWidth={true}
          onChange={this.handleOnChange}
          />
          <TextField
          name='supplier'
          value={this.state.supplier}
          hintText='Enter A Supplier'
          floatingLabelText='Supplier'
          floatingLabelFixed={true}
          fullWidth={true}
          onChange={this.handleOnChange}
          />
          <TextField
          name='color'
          value={this.state.color}
          hintText='Enter A Color'
          floatingLabelText='Color'
          floatingLabelFixed={true}
          fullWidth={true}
          onChange={this.handleOnChange}
          />
          <TextField
          name='material'
          value={this.state.material}
          hintText='Enter A Material'
          floatingLabelText='Material'
          floatingLabelFixed={true}
          fullWidth={true}
          onChange={this.handleOnChange}
          />
          <TextField
          name='location'
          value={this.state.location}
          hintText='Enter A Location'
          floatingLabelText='Location'
          floatingLabelFixed={true}
          fullWidth={true}
          onChange={this.handleOnChange}
          />
          <TextField
          name='vendor'
          value={this.state.vendor}
          hintText='Enter A Vendor'
          floatingLabelText='Vendor'
          floatingLabelFixed={true}
          fullWidth={true}
          onChange={this.handleOnChange}
          />
          <TextField
          name='vendorItemNo'
          value={this.state.vendorItemNo}
          hintText='Enter A Vendor Item Number'
          floatingLabelText='Vendor Item Number'
          floatingLabelFixed={true}
          fullWidth={true}
          onChange={this.handleOnChange}
          />
          <TextField
          name='length'
          value={this.state.length}
          hintText='Enter A Length'
          floatingLabelText='Length'
          floatingLabelFixed={true}
          fullWidth={true}
          onChange={this.handleOnChange}
          />
          <TextField
          name='width'
          value={this.state.width}
          hintText='Enter A Width'
          floatingLabelText='Width'
          floatingLabelFixed={true}
          fullWidth={true}
          onChange={this.handleOnChange}
          />
          <TextField
          name='height'
          value={this.state.height}
          hintText='Enter A Height'
          floatingLabelText='Height'
          floatingLabelFixed={true}
          fullWidth={true}
          onChange={this.handleOnChange}
          />
          <TextField
          name='price'
          value={this.state.price}
          hintText='Enter A Price'
          floatingLabelText='Price'
          floatingLabelFixed={true}
          fullWidth={true}
          onChange={this.handleOnChange}
          />
          <ChipInput
            name='tags'
            value={this.state.tags}
            floatingLabelText='Tags'
            floatingLabelFixed={true}
            hintText='Enter A Tag'
            onRequestAdd={(chip) => this.handleAddChip(chip)}
            onRequestDelete={(chip, index) => this.handleDeleteChip(chip, index)}
          />
          <TextField
          name='type'
          value={this.state.type}
          hintText='Enter A Type'
          floatingLabelText='Type'
          floatingLabelFixed={true}
          fullWidth={true}
          onChange={this.handleOnChange}
          />
          <TextField
          name='quantity'
          value={this.state.quantity}
          hintText='Enter A Quantity'
          floatingLabelText='Quantity'
          floatingLabelFixed={true}
          fullWidth={true}
          onChange={this.handleOnChange}
          />
          <SelectField
          floatingLabelText='Condition'
          value={this.state.condition}
          onChange={this.handleSelectField}>
            <MenuItem name='condition' value={1} primaryText="1" />
            <MenuItem name='condition' value={2} primaryText="2" />
            <MenuItem name='condition' value={3} primaryText="3" />
            <MenuItem name='condition' value={4} primaryText="4" />
            <MenuItem name='condition' value={5} primaryText="5" />
          </SelectField>
          { this.state.images ?
            <div style={styles.root}>
              <GridList cols={1} style={styles.gridList}>
                {this.state.images.map((image, index) => {
                    return (
                        <GridTile
                          key={index+1}
                          title={index+1}
                          titleStyle={styles.titleStyle}
                          actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
                          titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                        >
                          <img src={image} alt={index+1} />
                        </GridTile>
                      )
                  })
                }
                </GridList>
            </div> :
            <div></div>
          }
          <RaisedButton
             containerElement='label'
             label='Upload Images'>
             <input
                type='file'
                id='input'
                style={{ display: 'none' }}
                onChange={this.handleFiles}
                multiple/>
          </RaisedButton>
          <TextField
          name='alt'
          value={this.state.alt}
          hintText='Enter An Alt Tag for Image'
          floatingLabelText='Alt Tag'
          floatingLabelFixed={true}
          fullWidth={true}
          onChange={this.handleOnChange}
          />
          <TextField
          name='adwordsGroup'
          value={this.state.adwordsGroup}
          hintText='Enter An Adwords Group'
          floatingLabelText='Adwords Group'
          floatingLabelFixed={true}
          fullWidth={true}
          onChange={this.handleOnChange}
          />
          <TextField
          name='adwordsLabel'
          value={this.state.adwordsLabel}
          hintText='Enter An Adwords Label'
          floatingLabelText='Adwords Label'
          floatingLabelFixed={true}
          fullWidth={true}
          onChange={this.handleOnChange}
          />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    furnitures: state.furnitures
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    furnitureSubmit: (furniture) => {dispatch(furnitureSubmit(furniture))},
    updateFurnitureFields: (fields) => {dispatch(updateFurnitureFields(fields))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddModal)
