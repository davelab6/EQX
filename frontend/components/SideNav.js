import Link from "next/link"
// import Button from "@material/react-button";
// import {Body1} from "@material/react-typography";
// import Drawer, {
//   DrawerHeader,
//   DrawerSubtitle,
//   DrawerTitle,
//   DrawerContent,
// } from '@material/react-drawer';
// import MaterialIcon from '@material/react-material-icon';
// import List, {ListItem, ListItemGraphic, ListItemText} from '@material/react-list';

import React from 'react';
import {Typography, Box, Drawer, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
// import {DashboardIcon, NoteIcon, FolderIcon, WorkIcon, GroupIcon} from '@material-ui/icons';
import DashboardIcon from '@material-ui/icons/Dashboard';
import NoteIcon from '@material-ui/icons/Note';
import FolderIcon from '@material-ui/icons/Folder';
import WorkIcon from '@material-ui/icons/Work';
import GroupIcon from '@material-ui/icons/Group';
import axios from 'axios';
import Cookies from "js-cookie";

class SideNavRegular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <>
        <Drawer
          className="nav-drawer"
          variant="permanent"
          anchor="right"
          PaperProps={{ elevation: 6 }}
        >
          <List>
            <Link href="/"><a>
              <ListItem selected={this.props.page === "dashboard" ? true : false} button key="dashboard">
                <ListItemIcon><DashboardIcon /></ListItemIcon>
                <ListItemText primary='Dashboard'/>
              </ListItem>
            </a></Link>
            <Link href="/tests"><a>
              <ListItem selected={this.props.page === "tests" ? true : false} button key="tests">
                <ListItemIcon><NoteIcon /></ListItemIcon>
                <ListItemText primary='Your Tests'/>
              </ListItem>
            </a></Link>
            <Link href="/shared-tests"><a>
              <ListItem selected={this.props.page === "shared-tests" ? true : false} button key="shared-tests">
                <ListItemIcon><FolderIcon /></ListItemIcon>
                <ListItemText primary='Shared Tests'/>
              </ListItem>
            </a></Link>
            <Link href="/projects"><a>
              <ListItem selected={this.props.page === "projects" ? true : false} button key="projects">
                <ListItemIcon><WorkIcon /></ListItemIcon>
                <ListItemText primary='Projects'/>
              </ListItem>
            </a></Link>
            {/* <Link href="/groups"><a>
              <ListItem selected={this.props.page === "groups" ? true : false} button key="groups">
                <ListItemIcon><GroupIcon /></ListItemIcon>
                <ListItemText primary='Groups'/>
              </ListItem>
            </a></Link> */}
          </List>
          {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
      </Drawer>
      </>
    );
  }
}


import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import Router from 'next/router';

class SideNavCreateQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNumber: false
    };
  }

  componentDidMount = () => {
    this.update();
  }

	componentDidUpdate(nextProps) {
    if (nextProps.questionNumber !== this.props.questionNumber || 
      nextProps.test !== this.props.test) {
			this.update();
		}
  }
  
  update = () => {
    this.setState({ questionNumber: Number(Router.router.query.question) });
  }
  
  sideQuestionNavUpdate = (questionNumber) => {
    Router.push({
      pathname: '/create-question',
      query: { 
        test: this.props.test.id, 
        question: questionNumber
      },
    }, undefined, { shallow: true });
    this.props.pageUpdate();
  }

  addQuestion = () => {
    axios
      .post('http://localhost:1337/questions', {
        test: this.props.test.id,
      }, { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
      }).catch(error => { console.log(error);  // Handle Error
      }).then(response => { // Handle success
        axios
          .put('http://localhost:1337/tests/' + this.props.test.id, {
            questions: [...this.props.test.questions, response.data.id]
          }, { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
          }).catch(error => { console.log(error); // Handle Error
          }).then(response => { // Handle success
            this.props.pageUpdate(true);
          });
      })
  }
  nextQuestion = () => {
    Router.push({
      pathname: '/create-question',
      query: { 
        test: this.props.test.id, 
        question: this.state.questionNumber + 1
      },
    }, undefined, { shallow: true });
    this.props.pageUpdate();
  }
  prevQuestion = () => {
    Router.push({
      pathname: '/create-question',
      query: { 
        test: this.props.test.id, 
        question: this.state.questionNumber - 1
      },
    }, undefined, { shallow: true });
    this.props.pageUpdate();
  }
  overviewToggle = () => {
    this.props.sideNavUpdate();
  }
  render() {
    return (
      <>
        <Drawer
          className="create-question-drawer multi-drawer-1"
          variant="permanent"
          anchor="right"
          PaperProps={{ elevation: 6 }}
        >
          <List padding={2} style={{paddingTop: "64px"}} >
            <ListItem key="list-item-add-question" onClick={this.addQuestion} selected={this.props.page === "dashboard" ? true : false} button key="dashboard">
              <ListItemIcon><AddIcon /></ListItemIcon>
              <ListItemText primary='Add Question'/>
            </ListItem>
            {(this.props.test.questions && (this.state.questionNumber < this.props.test.questions.length)) &&
              <ListItem key="list-item-next-question" onClick={this.nextQuestion} selected={this.props.page === "tests" ? true : false} button>
                <ListItemIcon><ArrowForwardIcon /></ListItemIcon>
                <ListItemText primary='Next Question'/>
              </ListItem>
            }
            {(this.props.test.questions && (this.state.questionNumber > 1)) &&
              <ListItem key="list-item-prev-question" onClick={this.prevQuestion} selected={this.props.page === "tests" ? true : false} button>
                <ListItemIcon><ArrowBackIcon /></ListItemIcon>
                <ListItemText primary='Prev Question'/>
              </ListItem>
            }
            <ListItem className="multi-drawer-toggle" key="list-item-overview" onClick={this.overviewToggle} selected={this.props.page === "tests" ? true : false} button>
              <ListItemIcon><FormatListNumberedIcon /></ListItemIcon>
              <ListItemText primary='Overview'/>
            </ListItem>
          </List>
        </Drawer>
        <Drawer
          className="create-question-overview-drawer multi-drawer-2"
          variant="permanent"
          anchor="right"
          PaperProps={{ elevation: 6 }}
          data-open={false}
        >
          <List padding={2} style={{paddingTop: "64px"}} >
            {(this.props.test.questions && this.props.test.questions.length) &&
              this.props.test.questions.map((question, i) => 
                <ListItem button key={"question-" + i} onClick={() => this.sideQuestionNavUpdate(i+1)}>
                  <Box p={1} pt={2} width="100%">
                    <Typography variant="body1">
                      {question.question}
                    </Typography>
                  </Box>
                </ListItem>
              )
            }
          </List>
        </Drawer>
      </>
    );
  }
}


class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <>
        {	this.props.page === "create-question" ? (	
            <SideNavCreateQuestion {...this.props}/>
					) : (
            <SideNavRegular {...this.props}/>
					)}
      </>
    );
  }
}
export default SideNav;
