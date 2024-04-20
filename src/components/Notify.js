import {toast} from "react-toastify";
import {Button} from "react-bootstrap";

export const notify = (title, message, type) => {
    toast(
        <div>
            <h4 className='poppins-bold text-center'>{title}</h4>
            <p className='poppins-light text-center'>{message}</p>
        </div>, {
        position: "bottom-right",
        type: type,
        autoClose: 2000
    })
}

export const confirmation = (title, message, type, okFunction, noFunction, current) => {
    current = toast(
        <div>
            <h4 className='poppins-bold text-center'>{title}</h4>
            <p className='poppins-light text-center'>{message}</p>
            <div style={{ width: "100%", display:"flex", flexDirection:"row", columnGap:"5%" }}>
                <Button
                    style={{ width: "47%" }}
                    onClick={() => {
                    okFunction();
                    toast.dismiss(current);
                }}>I'm sure</Button>
                <Button
                    style={{ width: "47%" }}
                    onClick={() => {
                    noFunction();
                    toast.dismiss(current);
                }}>No, go back</Button>
            </div>
        </div>, {
            position: "bottom-right",
            type: type,
            autoClose: false
    })
}