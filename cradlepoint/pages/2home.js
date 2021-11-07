import React, { useState, useEffect } from 'react';
import PlainScreen from "../components/baseScreen/PlainScreen";
import { PlainTable } from "../components/tables/Table";
import { makeStyles } from '@mui/styles';
import CPButton from '../components/button/CPButton';
import NewEngagModal from './newEngagModal'
import NewEngagModalScratch from './newEngagModalScratch'
import NewEngagModalClone from './newEngagModalClone'

// TODO: adjust scaling and font of the page
export default function HomeScreen(props) {
    // TODO: have a consistent style for all the pages (delete later)
    const useStyles = makeStyles({
        root: {
          '& .header': {
            backgroundColor: '#FCAC1C',
          },
          '& .MuiDataGrid-iconSeparator': {
            display: 'None'
          },
          '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
            borderRight: `2px solid #f0f0f0`,
          },

        },
      });
    
    const classes = useStyles();

    const engagementColumns = [
        { field: 'id', headerName: 'id', headerClassName: 'header', flex: 1, hide: true},
        { field: 'name', headerName: 'Name', headerClassName: 'header', flex: 1},
        { field: 'status', headerName: 'Status', headerClassName: 'header', flex: 1},
        { field: 'details', headerName: 'Details', headerClassName: 'header', sortable:false, flex: 2, hide: true, minWidth: 200},
        { field: 'sysEng', headerName: 'SEng', headerClassName: 'header', flex: 1},
        { field: 'pocEng', headerName: 'POC Eng', headerClassName: 'header', flex: 1},
        { field: 'customer', headerName: 'Customer', headerClassName: 'header', flex: 1},
        { field: 'sfdc', headerName: 'SFDC', headerClassName: 'header', flex: 1},
        { field: 'dateCreated', headerName: 'Date Created', headerClassName: 'header', flex: 1},
        { 
          field: 'button', 
          flex: 1,
          minWidth: 100,
          headerName: 'Actions',
          headerClassName: 'header',
          align: 'center',
          renderCell: () => (
            <CPButton text="DETAILS"/>
          )
        }
      ];

// TODO: make rows not hard coded (delete later)
    const rows = [
    {id: 1, name: 'Engagement 1', status: 'Pending', details: ' ', sysEng: 'John Rogers',	pocEng: 'Paul Switchport', customer: 'ABC Bus Company', sfdc: 'https://cradlepoint.lightning.force.com/lightning/r/Opportunity/0063800000qtILXAA2/view', dateCreated: '10/01/2021'},
    {id: 2, name: 'Engagement 2', status: 'Assigned', details: ' ', sysEng: 'Michael Smith', pocEng: 'George Packets', customer: 'Big Finance', sfdc: 'https://cradlepoint.lightning.force.com/lightning/r/Opportunity/0063800000qtILXAA2/view', dateCreated: '10/02/2021'},
    {id: 3, name: 'Engagement 3', status: 'POC testing complete', details: ' ', sysEng: 'Don Lee', pocEng: 'Ron State', customer: 'SensorCo', sfdc: 'https://cradlepoint.lightning.force.com/lightning/r/Opportunity/0063800000qtILXAA2/view', dateCreated: '10/03/2021'},
    {id: 4, name: 'Engagement 4', status: 'POC testing outcome', details: ' ', sysEng: 'Jim Black', pocEng: 'Jason Dumps', customer: 'Burgerz-R-us', sfdc: 'https://cradlepoint.lightning.force.com/lightning/r/Opportunity/0063800000qtILXAA2/view', dateCreated: '10/04/20201'},
    {id: 5, name: 'Engagement 5', status: 'POC approved', details: ' ', sysEng: 'Don Lee', pocEng: 'Paul Switchport', customer: 'SensorCo', sfdc: 'https://cradlepoint.lightning.force.com/lightning/r/Opportunity/0063800000qtILXAA2/view', dateCreated: '10/05/20201'},
    {id: 6, name: 'Engagement 6', status: 'Archieved', details: ' ', sysEng: 'Jim Black', pocEng: 'George Packets', customer: 'Burgerz-R-us', sfdc: 'https://cradlepoint.lightning.force.com/lightning/r/Opportunity/0063800000qtILXAA2/view', dateCreated: '10/06/20201'}
    ]

    const [selectModalOpen, setSelectModalOpen] = React.useState(false);
    const [scratchModalOpen, setScratchModalOpen] = React.useState(false);
    const [cloneModalOpen, setCloneModalOpen] = React.useState(false);
    // const [modalType, setModalType] = React.useState("none");
  
    
    function updateModal(modalType){
      // console.log(input);
      // setModalType(input);
      console.log("modalOpen called with ");
      console.log(modalType);
      if (modalType === "select"){
        setSelectModalOpen(true)
      } else if (modalType === "scratch"){
        setScratchModalOpen(true)
      } else if (modalType === "clone"){
        setCloneModalOpen(true)
      } else {
        setSelectModalOpen(false)
        setScratchModalOpen(false)
        setCloneModalOpen(false)
      }
    }


    return(
        <PlainScreen>
            <CPButton 
              text="Create New Engagment"
              onClick={() => 
                {updateModal("select");
                console.log(selectModalOpen);
                }
              }
            />
            <PlainTable rows={rows} columns={engagementColumns} className={classes.root}/>
            <NewEngagModal
              modalOpen={selectModalOpen} 
              onClickNext={updateModal}
              onClose={()=> setSelectModalOpen(false)}></NewEngagModal>

            <NewEngagModalScratch
              modalOpen={scratchModalOpen} 
              onBack={()=> setScratchModalOpen(false)}></NewEngagModalScratch>

            <NewEngagModalClone
              modalOpen={cloneModalOpen} 
              onBack={()=> setCloneModalOpen(false)}></NewEngagModalClone>
      </PlainScreen>
    )
}