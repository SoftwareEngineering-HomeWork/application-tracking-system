import axios from 'axios';
import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter, Form } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import { CONSTANTS } from '../data/Constants';

const CustomProfileModal = (props) => {
	const { profile, setProfile, setModalOpen, updateProfile } = props;
	const [data, setData] = useState(profile);
	const [error, setError] = useState(false);

	const handleSave = () => {
		if (data[CONSTANTS.PROFILE.NAME] === '') {
			setError(true);
		} else {
			axios
				.post(
					'http://localhost:5001/recruiterprofile',
					{
						...data
					},
					{
						headers: {
							userid: localStorage.getItem('userId'),
							Authorization: `Bearer ${localStorage.getItem('token')}`
						}
					}
				)
				.then((res) => {
					// setProfile({ ...profile, ...data });
					updateProfile({ ...profile, ...data });
					console.log(data);
					setModalOpen(false);
				})
				.catch((err) => {
					console.log("error", err.message);
					setModalOpen(false);
				});
		}
	};

	return (
		<Modal show={true} centered>
			<ModalHeader>
				<h5 className='modal-title'>Edit Details</h5>
				<button
					type='button'
					className='btn-close'
					aria-label='Close'
					onClick={() => setModalOpen(false)}
				></button>
			</ModalHeader>
			<ModalBody>
				<Form>
					<Form.Group className='mb-3'>
						<Form.Label>
							Name<span style={{ color: 'red' }}>*</span>
						</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter name'
							value={data[CONSTANTS.PROFILE.NAME]}
							onChange={(e) =>
								setData({ ...data, [CONSTANTS.PROFILE.NAME]: e.target.value })
							}
						/>
						{error && (
							<span style={{ color: 'red', fontSize: 12 }}>
								This field is required
							</span>
						)}
					</Form.Group>
					<Form.Group className='my-3'>
						<Form.Label>Company</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter company'
							value={data[CONSTANTS.PROFILE.COMPANY_NAME]}
							onChange={(e) =>
								setData({
									...data,
									[CONSTANTS.PROFILE.COMPANY_NAME]: e.target.value
								})
							}
						/>
					</Form.Group>
					<Form.Group className='my-3'>
						<Form.Label>Email</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter email'
							value={data[CONSTANTS.PROFILE.EMAIL]}
							onChange={(e) =>
								setData({ ...data, [CONSTANTS.PROFILE.EMAIL]: e.target.value })
							}
						/>
					</Form.Group>
					<Form.Group className='my-3'>
						<Form.Label>City</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter city'
							value={data[CONSTANTS.PROFILE.ADDRESS]}
							onChange={(e) =>
								setData({
									...data,
									[CONSTANTS.PROFILE.ADDRESS]: e.target.value
								})
							}
						/>
					</Form.Group>
					<Form.Group className='my-3'>
						<Form.Label>Contact</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter contact'
							value={data[CONSTANTS.PROFILE.CONTACT]}
							onChange={(e) =>
								setData({
									...data,
									[CONSTANTS.PROFILE.CONTACT]: e.target.value
								})
							}
						/>
					</Form.Group>
				</Form>
			</ModalBody>
			<ModalFooter>
				<button type='button' className='btn btn-primary' onClick={handleSave}>
					Save
				</button>
			</ModalFooter>
		</Modal>
	);
};

export default CustomProfileModal;
