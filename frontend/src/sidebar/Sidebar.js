import React, { Component } from 'react'
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/css/fontawesome.css'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import EnableExtensionButton from '../extensionButton/Extension'

import '../static/Sidebar.css'
export default class Sidebar extends Component {
  render() {
    return (
      <div class="left-nav">
        <div class="left-nav-item">
          <div onClick={() => this.props.switchPage('SearchPage')}>
            <i class="fas fa-search left-nav-icon"></i>
            <span class="left-nav-label">Search</span>
          </div>
          <div onClick={() => this.props.switchPage('ExtensionPage')}>
            <i class="fas fa-file left-nav-icon"></i>
            <span class="left-nav-label">Extension details</span>
          </div>
          <div onClick={() => this.props.switchPage('DirectJobListingPage')}>
            <i class="fas fa-list left-nav-icon"></i>
            <span class="left-nav-label">Direct Job Listings</span>
          </div>
          <div onClick={() => this.props.switchPage('ManageResumePage')}>
            <i class="fas fa-folder left-nav-icon"></i>
            <span class="left-nav-label">Manage Resume</span>
          </div>
          <div onClick={() => this.props.switchPage('MatchesPage')}>
            <i class="fas fa-check-double left-nav-icon"></i>
            <span class="left-nav-label">Matches</span>
          </div>
          <div onClick={() => this.props.switchPage('ApplicationPage')}>
            <i class="fas fa-file-alt left-nav-icon"></i>
            <span class="left-nav-label">Applications</span>
          </div>
          <div onClick={() => this.props.switchPage('ProfilePage')}>
            <i class="fas fa-user-alt left-nav-icon"></i>
            <span class="left-nav-label">Profile</span>
          </div>
          <div onClick={() => this.props.handleLogout()}>
            <i class="fas fa-sign-out-alt left-nav-icon"></i>
            <span class="left-nav-label">LogOut</span>
          </div>
          <EnableExtensionButton/>
        </div>
      </div>
    )
  }
}
