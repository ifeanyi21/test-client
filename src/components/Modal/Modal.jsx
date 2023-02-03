import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Backdrop, CircularProgress } from "@mui/material";
import {useNavigate} from 'react-router-dom'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteConfirmation({ id }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()

  const [backDrop, setBackDrop] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const hanleRemove = async () => {
    setBackDrop(!backDrop);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}order_items/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();

    if(data.status){
      navigate("/order_items")
    }else{
      console.log("An Error Occured");
    }
  };

  return (
    <div className="flex">
      <Button variant="outlined" color="error" onClick={handleClickOpen}>
        Delete Order
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete Order"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You're about to delete this Order, click delete to confirm. This
            order can not be retrieved once deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={hanleRemove} variant="contained" color="error">
            Delete
          </Button>
          <Button onClick={handleClose} color="info">
            Cancel
          </Button>
        </DialogActions>
        <div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={backDrop}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </Dialog>
    </div>
  );
}
