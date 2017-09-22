import React, { Component } from 'react'
import firebase from 'firebase'
import { connect } from 'react-redux'
import { storageRef } from '../../config/constants'

// Action Creators
import { updateFurnitureFields, updateFurniture } from '../actions/furnitureActions'

// UI
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import ChipInput from 'material-ui-chip-input'



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
    vendor: furniture.vendor,
    tags: furniture.tags,
    images: furniture.images,
    timestamp: formatTimestamp(Date.now()),
  }
}

class EditModal extends Component {
  constructor(props) {
    super(props);
    // let selectedFurniture = Object.keys(this.props.furnitures).filter((item, index) => {
    //   return this.props.id === item.furnitureId
    // })
    let selectedFurniture
    for (let [k, v] of Object.entries(this.props.furnitures.furnitures)) {
      if (k === this.props.id) {
        selectedFurniture = v
        // console.log(k, v)
        }
    }

    this.state = {
      open: false,
      title: selectedFurniture.title,
      description: selectedFurniture.description,
      vendor: selectedFurniture.vendor,
      tags: selectedFurniture.tags,
      images: selectedFurniture.images
    }
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  updateFurniture = (furnitureId) => {
    // update redux store
    this.props.updateFurnitureFields(this.state)
    // update firebase
    this.props.updateFurniture(formatFurniture(this.state), furnitureId)

    // close modal
    this.setState({
      open: false,
      title: '',
      description: '',
      vendor: '',
      tags: [],
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
          // console.log(urls, urls.length, typeof(urls))
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
        label='Update'
        primary={true}
        onTouchTap={this.updateFurniture(this.props.id)}
      />,
    ];

    return (
      <div style={{padding: '0px 20px 15px 0px ', display: 'inline-block'}}>
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
          name='vendor'
          value={this.state.vendor}
          hintText='Enter A Vendor'
          floatingLabelText='Vendor'
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
    updateFurniture: (furniture, furnitureId) => {dispatch(updateFurniture(furniture, furnitureId))},
    updateFurnitureFields: (fields) => {dispatch(updateFurnitureFields(fields))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModal)
