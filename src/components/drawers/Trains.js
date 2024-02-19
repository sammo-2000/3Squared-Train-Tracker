import { Drawer } from 'antd'
import { useState} from 'react';

const Trains = (props) => {
    const[open, setOpen] = useState(false);

    const onClose = () => {
        setOpen(false);
    };

    const showDrawer = () => {
        setOpen(true);
    };

    return(
        <Drawer title="Basic Drawer" onClose={props.onClose} open={props.open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    );
};