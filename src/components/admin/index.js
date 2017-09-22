import React, { Component } from 'react'
import { Route, NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from '../../styles/admin.css'

import Furniture from '../furniture'
import Logout from '../logout'
import { fetchAndHandleFurnitures } from '../../actions/furnitureActions'

const Topic = ({ match }) => (
  <div>
    {match.params.topicId === 'stock' ? <Furniture />:<h3>{match.params.topicId}</h3>}
  </div>
)

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {open: true};
  }

  componentDidMount() {
    this.props.fetchAndHandleFurnitures()
  }

  render() {
    return (
      <div>
      <div className={styles.dashboard}>
			<div className="add-container">
				<div className={styles.sidebarWrapper}>
					<div className={styles.sidebar}>
						<div className={styles.sidebarHeader}>Dashboard</div>
						<ul className={styles.sidebarMenu}>
							<li><NavLink to={`${this.props.match.url}/stock`} className="active"><span className="lnr lnr-apartment"></span> Furniture</NavLink></li>
							<li><Link to={`${this.props.match.url}/calendar`} className="active"><span className="lnr lnr-calendar-full"></span> Calendar</Link></li>
							<li><Link to={`${this.props.match.url}/settings`} className="active"><span className="lnr lnr-users"></span> Settings</Link></li>
						</ul>
						<div className={styles.userInfo}>
							<img className={styles.userAvatar} src={'/user.png'} alt={'user'}/>
							<div className={styles.userInfoWrapper}>
								<span className={styles.userName}>{'Admin User'}&nbsp;
									<Link to="/" className="active"><i className="lnr lnr-cog"></i></Link>
								</span>
								<span className={styles.userRole}>({'role'})&nbsp;</span>
								<Logout />
							</div>
						</div>
					</div>
				</div>
				<div className={styles.bashboardContent}>
          <Route path={`${this.props.match.url}/:topicId`} component={Topic}/>
          <Route exact path={this.props.match.url} render={() => (
            <h3>Please select a topic.</h3>
          )}/>
				</div>
			</div>
		</div>
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
    fetchAndHandleFurnitures: () => {dispatch(fetchAndHandleFurnitures())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
