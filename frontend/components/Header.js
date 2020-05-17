import Link from "next/link"
import {TopAppBarRow } from '@material/react-top-app-bar';
import IconButton from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';
import {Box, AppBar, Container, Grid, Button, Typography, TextField, DialogActions, DialogContent, Dialog, DialogTitle, DialogContentText } from '@material-ui/core';
import Switch from '@material/react-switch';
import LinearProgress from '@material/react-linear-progress';
import Avatar from './header/Avatar';
import SignUp from '../components/SignUp';
import Router from 'next/router';

class CreatingHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments: true,
      questionNumber: false
    };
  }
  componentDidMount = () => {
    this.update();
  }

	componentDidUpdate(nextProps) {
		const { questionNumber, test } = this.props
		if (nextProps.questionNumber !== questionNumber) {
			this.update();
		}
		if (nextProps.test !== test) {
			this.update();
		}
	}

  update = () => {
    this.setState({ questionNumber: Router.router.query.question });
  }
  render(){
    return(
      <TopAppBarRow className="header-row-2">
        <Grid container className="header-grid-2">
          <Grid item xs={12} >
            {/*<TopAppBarSection className="">*/}
              <Typography variant="h6" className="question-counter">Question {this.state.questionNumber}</Typography>
              <Box className="titles-wrapper">
                <Typography className="font-title" variant="body1"><span className="emphasis">{this.props.test.name}</span> v.{this.props.test.major_version}.{this.props.test.minor_version}</Typography>
                <Typography className="project-title" variant="body1" style={{opacity: "0.25"}}><span className="emphasis">{this.props.test.project && this.props.test.project.name}</span> v.{this.props.test.project && this.props.test.project.major_version}.{this.props.test.project && this.props.test.project.minor_version}</Typography>
              </Box>
            {/*</TopAppBarSection>*/}
          </Grid>
        </Grid>
      </TopAppBarRow>
    );
  }
}


class AnsweringHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments: true
    };
  }
  render(){
    return(
      <TopAppBarRow className="header-row-2">
        <LinearProgress className="progress-bar" value={0} progress={this.props.progressBar} buffer={1} bufferingDots={false}/>
        <Grid container className="header-grid-2">
            <Grid item xs={6}>
              <Typography variant="h6" className="question-counter">{this.props.progressBar}% Done</Typography>
              <Box className="titles-wrapper">
                <Typography className="font-title" variant="body1"><span className="emphasis">{this.props.test.name}</span> v.{this.props.test.major_version}.{this.props.test.minor_version}</Typography>
                <Typography className="project-title" variant="body1" style={{opacity: "0.25"}}><span className="emphasis">{this.props.test.project && this.props.test.project.name}</span> v.{this.props.test.project && this.props.test.project.major_version}.{this.props.test.project && this.props.test.project.minor_version}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} className="text-align-right">
              <Switch className="show-comments-switch" nativeControlId='show-comments-switch' checked={this.state.showComments} onChange={(e) => this.setState({showComments: e.target.showComments})} />
              <Typography  variant="body2" tag="label" htmlFor='show-comments-switch' className="show-comments-switch-label">Show comments</Typography>
            </Grid>
        </Grid>
      </TopAppBarRow>
    );
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openSignup: false,
      textFieldSignupValue: ""
    };
  }
  handleSignupOpen = () => {
    this.setState({ openSignup: true});
  }
  handleSignupClose = () => {
    this.setState({ openSignup: false});
    this.setState({ textFieldSignupValue: "" });
  }
  render() {
    return (
      // <TopAppBar className="header">
      <AppBar color="inherit" className="header">
        <Container maxWidth={false}>
          <TopAppBarRow className="header-row-1">
            <Grid container className="header-grid-1">
              <Grid item xs={6}>
                <Link href="/">
                  <a>
                    <Typography variant="h5" className="logo" style={{fontWeight:700}}>EQX</Typography>
                  </a>
                </Link>
              </Grid>
              <Grid item xs={6}>
                {this.props.auth ? (	
                  <>
                    <div className="sidebar-align">
                      <IconButton className="header-notifications">
                        <MaterialIcon icon='notifications' />
                      </IconButton>
                      {/* <IconButton className="header-notifications header-avatar">
                        <MaterialIcon icon='avatar' />
                      </IconButton> */}
                      <Avatar/>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="sidebar-align text-align-right">
                      <Button color="primary" className="sign-in-button" onClick={() => console.log("clicked login!")}>Login</Button>
                      <Button variant="contained" color="primary" className="sign-up-button" onClick={this.handleSignupOpen}>Sign Up</Button>
                    </div>

                    <Dialog open={this.state.openSignup} onClose={this.handleSignupClose}>
                      <SignUp/>
                      {/* <DialogTitle id="form-dialog-title">New Test</DialogTitle> */}
                      {/* <DialogContent>
                        <DialogContentText>Tests should be built around verifing a specific goal.</DialogContentText>
                        <TextField value={this.state.textFieldSignupValue} onChange={this.handleSignupChange} autoFocus margin="dense" id="name" label="Test's Name" type="text" fullWidth />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleSignupClose} color="primary">Cancel</Button>
                        <Button onClick={this.handleSignupSubmit} color="primary">Create</Button>
                      </DialogActions> */}
                    </Dialog>
                  </>
                )}
              </Grid>
            </Grid>
          </TopAppBarRow>
          {this.props.headerType == "creating" ? <CreatingHeader {...this.props}/> : null}  
          {this.props.headerType == "answering" ? <AnsweringHeader progressBar={this.props.progressBar}/> : null}    
        </Container>
      </AppBar>
    );
  }
} 


export default Header;