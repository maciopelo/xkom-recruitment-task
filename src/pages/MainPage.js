import React, {useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadHallData, setProposedSeats} from "../redux/actions/hallAction"
import { addUserPreferences } from "../redux/actions/userAction";
import "../styles/mainPage.scss"
import { Form, InputNumber, Checkbox, Button } from 'antd';
import axios from 'axios';


const BASE_URL = "http://localhost:3000"

const MainPage = () => {
  
  let history = useHistory();
  const dispatch = useDispatch();
  const freeSeats = useSelector(state => state.hall.freeSeats.length);

  useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(`${BASE_URL}/seats`);
        dispatch(loadHallData(response.data))
      }

      fetchData();
  }, [])

  const onFinish = (values) => {
    dispatch(addUserPreferences(values));
    dispatch(setProposedSeats(values.seats));
    history.push("/reserve");
  };

  const onFinishFailed = (err) => {
    console.log('Failed:', err);
  };

    return (
    <div className="main-page-container"> 
      <div className="reservation-form-wrapper">
        <Form 
          
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={ {sideBySide: false} }
        >

            <Form.Item
                label="Ilość miejsc:"
                name="seats"
                rules={[{required:true, type:'number' , message:"Nie wprowadzono liczby miejsc"}]}
            >

              <InputNumber  style={{width:'100%', border:"1px solid #000"}} min={1} max={freeSeats} size="large"/>

            </Form.Item>


            <Form.Item
                name="sideBySide"
                valuePropName="checked"
            >

              <Checkbox> Czy miejsca mają być obok siebie ? </Checkbox>
            </Form.Item>


            <Form.Item>
              <Button htmlType="submit" visible="true"> Wybierz miejsca </Button>
            </Form.Item>
            
        </Form>
      </div>
    </div>
     );
}
 
export default MainPage;