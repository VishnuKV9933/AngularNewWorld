import { Component } from '@angular/core';
import { faHome,faUser, faComments, faBell, faAnglesLeft, } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'usersidebar',
  templateUrl: './usersidebar.component.html',
  styleUrls: ['./usersidebar.component.css']
})
export class UsersidebarComponent {
  Home=faHome
  Profile=faUser
  Chat=faComments
  Notice=faBell
  Logout=faAnglesLeft
}
