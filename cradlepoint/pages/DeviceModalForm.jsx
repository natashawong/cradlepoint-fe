import React, {useState} from "react";
import Modal from 'react-modal';
import CPButton from "../components/button/CPButton";
import styles from '../styles/Modal.module.css'
import PropTypes from 'prop-types';
import { Field, Formik} from 'formik';
import DropDown from "../components/fields/DropDown";
import { useRouter } from 'next/router'
import { SmallTextInput, BigTextInput } from "../components/fields/Text";
import { borderLeft } from "@mui/system";

export default function ResultModalForm(props) {
    const router = useRouter();
    const initialData = {
      deviceName: "",
      codeVersion: "",
      SKU: "",
      deviceType: "",
    }
    const [data, setData] = useState(initialData);
    const options = ["Software", "Hardware"];
    function handleChange(evt) {
      const value = evt.target.value;
      setData({
        ...data,
        [evt.target.name]: value
      });
    }
  
    async function handleSubmitData() {
      let newData = {
        "deviceName":data.deviceName, 
        "codeVersion":data.codeVersion, 
        "SKU":data.SKU,
        "deviceType": data.deviceType
      }
      try{
        const res = await fetch('/api/addNewDevice', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData),
        })
        console.log(newData)
      } catch (err){
        console.log("Error:",err)
      }
      props.onBack()
    }

  return (
      <Modal className={styles.Modal} isOpen={props.isOpen}>
        <h2>Add New Device to Library</h2>
        <div style={{alignItems:borderLeft}}>
        <SmallTextInput label="Device Name:" name='deviceName' value={data.deviceName} onChange={handleChange}/>
        <SmallTextInput label="Code Version:" name='codeVersion' value={data.codeVersion} onChange={handleChange} />
        <SmallTextInput label="SKU:" name='SKU' value={data.SKU} onChange={handleChange} />
        {/* <SmallTextInput label="Device Type" name='deviceType' value={data.deviceType} onChange={handleChange} /> */}

        {/* <div style={{padding: "25px"}}>
          <Formik>
            <label>
              Device Type:
              <Field as="select" name="deviceType" value={data.deviceType} onChange={handleChange}>
                <option value="Software">Software</option>
                <option value="Hardware">Hardware</option>
              </Field>
              </label>
            </Formik>
            </div> */}
          <DropDown title="Device Type: " name="deviceType" value={data.deviceType} 
            onChange={handleChange} options={options}/>
        </div>
        <CPButton text='Back' onClick={()=>{
          setData(initialData);
          props.onBack()
        }}/>
        <CPButton text='Create' onClick={handleSubmitData}/>
      </Modal>
  );
}

ResultModalForm.propTypes = {
  onBack: PropTypes.bool.isRequired,
  modalOpen: PropTypes.bool.isRequired,
}

