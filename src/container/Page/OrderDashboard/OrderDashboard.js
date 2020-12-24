import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container';
// import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { firestore } from '../../../config/firebase';
import { Button, Typography } from '@material-ui/core';
import chilli from '../../../image/chilli.png';
import fireEgg from '../../../image/friedegg.png';
import thaiOmelette from '../../../image/thaiomelette.png';
import rice from '../../../image/rice.png';

// const useStyles = makeStyles((theme) => ({
//     seeMore: {
//         marginTop: theme.spacing(3),
//     },
// }));


export default function OrderDashboard() {
    // const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState([]);

    const imgEgg = (egg) => {
        if (egg === '1') {
            return <img
                src={fireEgg}
                width="50px"
                alt='fireEgg'
            />
        } else if (egg === '2') {
            return <img
                src={thaiOmelette}
                width="50px"
                alt='thaiOmelette'
            />
        } else {
            return ""
        }
    }

    const repImg = (spicy) => {
        const imgs = []
        for (let i = 0; i < spicy; i++) {
            imgs.push(<img
                src={chilli}
                width="25px"
                alt='chilli'
            />)
        }
        return imgs;
    }

    const repRiceImg = (q) => {
        const imgs = []
        for (let i = 0; i < q; i++) {
            imgs.push(<img
                src={rice}
                width="50px"
                alt='rice'
            />)
        }
        return imgs;
    }

    // EDIT FUNCTION
    const onStatusChange = (id) => {
        const ref = firestore.collection('foodOrder');
        const updateOrder = {
            status: 'เสร็จแล้ว'
        }
        ref
            .doc(id)
            .update(updateOrder)
            .then(() => {
                alert('Order has been update...')
            })
            .catch((err) => {
                console.error(err);
            });
    }

    //REALTIME GET FUNCTION
    const getAllOrder = () => {
        const orderRef = firestore.collection('foodOrder');
        setLoading(true);
        orderRef
            .where('status', '==', 'อยู่ระหว่างดำเนินการ')
            .onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push(doc.data());
                });
                setOrder(items);
                setLoading(false);
            });
    }

    useEffect(() => {
        getAllOrder();
    }, []);

    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "80vh",
                }}
            >
                <h1>Loading ...</h1>
            </div>
        );
    }

    return (
        <Container maxWidth="lg">
            {/* <Title>Recent Orders</Title> */}
            <Typography variant="h3" gutterBottom>
                รายการอาหาร
      </Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>ลำดับที่</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell>ขนาด</TableCell>
                        <TableCell>ความเผ็ด</TableCell>
                        <TableCell>ไข่</TableCell>
                        <TableCell>เพิ่มเติม</TableCell>
                        <TableCell>จำนวน</TableCell>
                        <TableCell>ลูกค้า</TableCell>
                        <TableCell>สถานะ</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {order.map((order, idx) => (
                        <TableRow key={order.orderId}>
                            <TableCell>{idx + 1}</TableCell>
                            <TableCell>
                            </TableCell>
                            <TableCell>{order.name}</TableCell>
                            <TableCell>
                                {repRiceImg(order.foodSize)}
                            </TableCell>
                            <TableCell>
                                {repImg(order.spicy)}
                            </TableCell>
                            <TableCell>
                                {imgEgg(order.egg)}
                            </TableCell>
                            <TableCell>{order.option}</TableCell>
                            <TableCell>{order.qty}</TableCell>
                            <TableCell>{order.email}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => onStatusChange(order.orderId)}
                                >
                                    {order.status}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    )
}
