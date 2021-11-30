import React from "react";
import Modal from 'react-modal';
import CPButton from "../components/button/CPButton";
import styles from '../styles/Modal.module.css'
import { SmallTextInput, BigTextInput } from "../components/fields/Text";
import { borderLeft } from "@mui/system";
import PropTypes from 'prop-types';

export default function EngagementModalForm(props) {
  return (
      <Modal className={styles.Modal} isOpen={props.isOpen}>
        <h2>Fill in New Engagement Info</h2>
        <div style={{alignItems:borderLeft}}>
        <SmallTextInput name='Engagement Name'/>
        <SmallTextInput name='Customer'/>
        <SmallTextInput name='SFDC'/>
        <BigTextInput name='Engagement Description'/>
        </div>
        <CPButton text='Back' onClick={props.onBack}/>
        <CPButton text='Create' onClick={props.onClick}/>
      </Modal>
  );
}

EngagementModalForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onBack: PropTypes.bool.isRequired,
  onClick:PropTypes.func.isRequired
}