import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import AppBar from 'material-ui/AppBar'
import CheckBox from 'material-ui/svg-icons/toggle/check-box'
import Checkbox2 from 'material-ui/Checkbox';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import EditorBorderColor from 'material-ui/svg-icons/editor/border-color'
import TextField from 'material-ui/TextField'
import AddModal from '../modal'
import loader from '../../styles/loader.css'

import { updateFurniture, removeAndHandleFurniture } from '../../actions/furnitureActions'

// App Bar
const handleTouchTap = () => {
  alert('onTouchTap triggered on the title component')
}

const headerStyles = {
  title: {
    cursor: 'pointer',
  },
  backgroundColor: {
    backgroundColor: '#7055c1'
  }
}

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

const listStyles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

class Furniture extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editing: false,
      fieldName: '',
      currentValue: '',
      clicked: '',
      name: 'e'
    }
  }
  handleFieldEdit = (nameof, e) => {
    // persist to prevent event from defaulting to null due to Synthetic Events in React
    e.persist()
    // stop event from bubbling up
    e.stopPropagation()
    if (e.isPropagationStopped()) {
      // console.log('propagation stopped')
    }
    // get values
    let fieldname = e.currentTarget.nextSibling.innerHTML
    let cValue = e.currentTarget.nextSibling.nextSibling.innerHTML
    // name of the Field that was clicked on
    let name = nameof
    // set furniture component state to trigger conditional render
    this.setState({
      editing: true,
      fieldName: fieldname,
      currentValue: cValue,
      clicked: cValue,
      name: name
    })
  }
  handleFurnitureDelete = (id, e) => {
    // get current state of furnitures
    let updatedState = this.props.furnitures.furnitures
    // remove deleted item from state
    delete updatedState[id] // delete removes single property in object
    // dispatch action to remove ref.child in firebase and update state
    this.props.dispatch(removeAndHandleFurniture(updatedState, id))
  }

  handleImageFurnitureDelete = (e) => {
    // event target
    let key
    // handle both parent and child elements on click
    e.target.getAttribute('name') === null ?
      key = e.target.parentNode.getAttribute('name') :
      key = e.target.getAttribute('name')
    // format edited image array
    let index = key.split(' ')[0]
    let furnitureId = key.split(' ')[1]
    let newImage = this.props.furnitures.furnitures[furnitureId].images.splice(index, 1)
    let updatedFurniture = {
      ...this.props.furnitures.furnitures[furnitureId],
      images: newImage
    }
    // dispatch to store
    this.props.dispatch(updateFurniture(updatedFurniture, furnitureId))
  }

  render () {
    return (
      <div>
        <AppBar
          style={headerStyles.backgroundColor}
          title={<span style={headerStyles.title}>Available Stock</span>}
          onTitleTouchTap={handleTouchTap}
          iconElementLeft={<IconButton><CheckBox /></IconButton>}
          iconElementRight={<AddModal label="Add" />}
        />
        { !this.props.furnitures.isFetching && this.props.furnitures.furnitures ?
            Object.keys(this.props.furnitures.furnitures).map((furniture) => {
              let item = this.props.furnitures.furnitures[furniture]
              // console.log(item)
            return (
              <Card key={item.furnitureId}>
                <CardHeader
                  title={item.title}
                  subtitle={item.description}
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardActions>
                  {item.tags ? item.tags.map((tag) => {
                    return <FlatButton key={tag} label={tag} />
                  }) : <div></div>}
                </CardActions>
                <CardText expandable={true}>
                  <CardActions>
                    <FlatButton label={'Edit'}/>
                    <FlatButton label={'Delete'} onClick={(e) => this.handleFurnitureDelete(item.furnitureId, e)}/>
                  </CardActions>
                  <div style={listStyles}>
                  <List>
                    <Subheader>General</Subheader>
                    {this.state.editing &&
                     this.state.clicked === item[this.state.name] ?
                      <TextField
                        value={this.state.currentValue}
                        floatingLabelText={this.state.fieldName}
                        floatingLabelFixed={true}
                        fullWidth={true}
                      />
                      :
                      <ListItem
                        primaryText="Item Number"
                        secondaryText={item.itemNo}
                        name='itemNo'
                        rightIcon={<EditorBorderColor/>}
                        // rightIcon={<EditorBorderColor
                        //   onClick={(e) => {this.handleFieldEdit('itemNo', e)}}/>}
                      />
                    }
                    {this.state.editing &&
                     this.state.clicked === item[this.state.name] ?
                      <TextField
                        value={this.state.currentValue}
                        floatingLabelText={this.state.fieldName}
                        floatingLabelFixed={true}

                      /> :
                      <ListItem
                        primaryText="Brand"
                        secondaryText={item.brand}
                        name='brand'
                        // rightIcon={<EditorBorderColor
                        //   onClick={(e) => {this.handleFieldEdit('brand', e)}}/>}
                        rightIcon={<EditorBorderColor/>}
                      />
                    }
                    <ListItem
                      primaryText="Supplier"
                      secondaryText={item.supplier}
                      rightIcon={<EditorBorderColor />}
                    />
                    <ListItem
                      primaryText="Vendor"
                      secondaryText={item.vendor}
                      rightIcon={<EditorBorderColor />}
                    />
                    <ListItem
                      primaryText="Vendor"
                      secondaryText={item.vendorItemNo}
                      rightIcon={<EditorBorderColor />}
                    />
                    <ListItem
                      primaryText="Price"
                      secondaryText={item.price}
                      rightIcon={<EditorBorderColor />}
                    />
                    <ListItem
                      primaryText="Quantity"
                      secondaryText={item.quantity}
                      rightIcon={<EditorBorderColor />}
                    />
                    <ListItem
                      primaryText="Available"
                      secondaryText={item.available ? 'yes' : 'no'}
                      rightIcon={<EditorBorderColor />}
                    />
                  </List>
                  <Divider />
                  <List>
                    <Subheader>Specifications</Subheader>
                    <ListItem
                      primaryText="Color"
                      secondaryText={item.color}
                      rightIcon={<EditorBorderColor />}
                    />
                    <ListItem
                      primaryText="Material"
                      secondaryText={item.material}
                      rightIcon={<EditorBorderColor />}
                    />
                    <ListItem
                      primaryText="Length"
                      secondaryText={item.length}
                      rightIcon={<EditorBorderColor />}
                    />
                    <ListItem
                      primaryText="Width"
                      secondaryText={item.width}
                      rightIcon={<EditorBorderColor />}
                    />
                    <ListItem
                      primaryText="Height"
                      secondaryText={item.height}
                      rightIcon={<EditorBorderColor />}
                    />
                    <ListItem
                      primaryText="Condition"
                      secondaryText={item.condition}
                      rightIcon={<EditorBorderColor />}
                    />
                  </List>
                  <Divider />
                  <List>
                    <ListItem
                      leftCheckbox={<Checkbox2 />}
                      primaryText="Alt"
                      secondaryText={item.alt}
                      rightIcon={<EditorBorderColor />}
                    />
                    <ListItem
                      leftCheckbox={<Checkbox2 />}
                      primaryText='Adwords Group'
                      secondaryText={item.adwordsGroup}
                    />
                    <ListItem
                      leftCheckbox={<Checkbox2 />}
                      primaryText='Adwords Label'
                      secondaryText={item.adwordsLabel}
                      rightIcon={<EditorBorderColor />}
                    />
                  </List>
                  </div>
                  <CardTitle title={'Images'} />
                  <div style={styles.root}>
                    <GridList style={styles.gridList} cols={2.2}>
                      {item.images.map((image, index) => (
                        <GridTile
                          key={index+1}
                          title={index+1}
                          actionIcon={<IconButton onClick={this.handleFurnitureImageDelete} ><NavigationClose color="rgb(0, 188, 212)" name={index+ ' ' + item.furnitureId}/></IconButton>}
                          titleStyle={styles.titleStyle}
                          titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                        >
                          <img src={image} alt={image} />
                        </GridTile>
                      ))}
                    </GridList>
                  </div>
                </CardText>
              </Card>
            )
          }) :
          <div className={loader.container}>
            <div className={loader.loader}>Loading</div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    furnitures: state.furnitures
  }
}

export default connect(mapStateToProps)(Furniture)
