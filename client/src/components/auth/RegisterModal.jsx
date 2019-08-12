import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

class RegisterModal extends Component {
	state = {
		modal: false,
		name: '',
		email: '',
		password: '',
		msg: null
	}

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		register: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired
	}

	componentDidUpdate(prevProps) {
		const { error, isAuthenticated } = this.props
		if(error !== prevProps.error) {
			// Check for register error
			(error.id === 'REGISTER_FAIL') ? this.setState({ msg: error.msg.msg }) : this.setState({ msg: null })
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
		const { name, email, password } = this.state

		/* Create user object */
		const newUser = { name, email, password }

		/* Attempt to register */
		this.props.register(newUser)
	}

	render() {
		return(
			<div>
				<NavLink onClick={ this.toggle } href='#'> Register </NavLink>
				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
				>
					<ModalHeader toggle={ this.toggle }>Register</ModalHeader>
					<ModalBody>
						{ this.state.msg ? <Alert color="danger">{ this.state.msg }</Alert> : null }
						<Form onSubmit={ this.onSubmit }>
							<FormGroup>
								<Label for="name">Name</Label>
								<Input 
									type='text'
									name='name'
									id='name'
									bsize='sm'
									placeholder='Name'
									className='mb-3'
									onChange={ this.onChange }
									autoFocus
								/>

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
							>Register</Button>
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

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal)
