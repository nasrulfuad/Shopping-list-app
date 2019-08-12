import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

class LoginModal extends Component {
	state = {
		modal: false,
		email: '',
		password: '',
		msg: null
	}

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		login: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired
	}

	componentDidUpdate(prevProps) {
		const { error, isAuthenticated } = this.props
		if(error !== prevProps.error) {
			// Check for register error
			(error.id === 'LOGIN_FAIL') ? this.setState({ msg: error.msg.msg }) : this.setState({ msg: null })
		}

		// If authenticated, disable modal register
		if(this.state.modal) {
			if(isAuthenticated) {
				this.toggle()
			}
		}
	}

	toggle = () => {
		// Clear errors
		this.props.clearErrors()
		this.setState({
			modal: !this.state.modal
		})
	}

	onChange = e => this.setState({ [e.target.name]: e.target.value })

	onSubmit = e => {
		e.preventDefault()
		const { email, password } = this.state
		/* Attempt to login */
		this.props.login({ email, password })
	}

	render() {
		return(
			<div>
				<NavLink onClick={ this.toggle } href='#'> Login </NavLink>
				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
				>
					<ModalHeader toggle={ this.toggle }> Login </ModalHeader>
					<ModalBody>
						{ this.state.msg ? <Alert color="danger">{ this.state.msg }</Alert> : null }
						<Form onSubmit={ this.onSubmit }>
							<FormGroup>
								<Label for='email'>Email</Label>
								<Input 
									type='email'
									name='email'
									id='email'
									bsize='sm'
									placeholder='Email'
									className='mb-3'
									onChange={ this.onChange }
								/>

								<Label for='password'>Password</Label>
								<Input 
									type='password'
									name='password'
									id='password'
									bsize='sm'
									placeholder='Password'
									className='mb-3'
									onChange={ this.onChange }
								/>
							</FormGroup>
							<Button
								color="dark"
								style={{ marginBottom: '2rem' }}
								block
							> Login </Button>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error
})

export default connect(mapStateToProps, { login, clearErrors })(LoginModal)
