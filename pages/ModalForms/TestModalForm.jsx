import React, {useState} from "react";
import Modal from 'react-modal';
import CPButton from "../../components/button/CPButton";
import styles from '../../styles/Modal.module.css'
import { SmallTextInput, BigTextInput } from "../../components/fields/Text";
import { borderLeft } from "@mui/system";
import { useRouter } from 'next/router'
import {ObjectID} from 'bson';
import {modalFormType} from '../../util/modalUtils';

export default function TestModalForm(props) {
  const router = useRouter();

  const initialData = (props.isClone)? 
  {
    _id: new ObjectID(),
    name: (props.cloneData?.name??"") + " (copy)",
    description: props.cloneData?.description??"",
    resultStatus: props.data?.resultStatus??"Unknown"
  }:{
    // data is passed only from the edit 
    _id: props.data?._id??new ObjectID(),
    name: props.data?.name??"",
    description: props.data?.description??"",
    resultStatus: props.data?.resultStatus??"Unknown"
  }

  const [data, setData] = useState(initialData);

  function handleChange(evt) {
    const value = evt.target.value;
    setData({
      ...data,
      [evt.target.name]: value
    });
  }

  async function handleSubmitData() {
    let newData = {
      ...props.data, 
      "_id":data._id, 
      "name":data.name, 
      "description":data.description,
      "testCaseId": props.testCaseId,
      "resultStatus": data.resultStatus
    }

    let endPoint = '/api/edit/Test';
    let method = 'PUT';
    if (props.modalFormType==modalFormType.NEW){
      endPoint = props.isClone?'/api/cloneTest':'/api/add/NewTest';
      method = 'POST';
      newData["results"] = [];
    }

    try{
      const d = JSON.stringify(newData);
      const res = await fetch(endPoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(d)
        },
        body: d,
      })
      console.log("RES:", res)
    } catch (err){
      console.log("Error:",err)
    }
    
    props.onClose();
    // TODO: if create new, then should navigate to the corresponding test details page
    if (props.modalFormType==modalFormType.NEW){
      setData(initialData);
    }
    
  }

  return (
    <>
      <Modal className={styles.content} isOpen={props.isOpen} overlayClassName={styles.overlay}>
        <h2>Fill in Test Info</h2>
        <div style={{alignItems:borderLeft}}>
        <SmallTextInput label="Name" name='name' value={data.name} onChange={handleChange}/>
        <BigTextInput label="Description" name='description' value={data.description} onChange={handleChange} />
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <CPButton text='Back' onClick={()=>{
            setData(initialData);
            props.onBack()
          }}/>
          <CPButton text='Done' onClick={handleSubmitData}/>
        </div>
      </Modal>
    </>
  );
}
