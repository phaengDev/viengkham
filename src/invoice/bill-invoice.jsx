
import React,{ useEffect, useState } from 'react';
import  '../invoice.css';
import { Config } from '../config/connect';
import moment from 'moment';
import numeral from 'numeral';
const  api=Config.urlApi;
const Invoice = ({ invoice }) => {
    const [data, setData] = useState({ dataList: [] });
   const fetchData = async () => {
    try {
        const response = await fetch(api + 'sale-r/reques/'+invoice);
        const jsonData = await response.json();
        setData(jsonData);
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
useEffect(() => {
    fetchData();
}, []);
return (
  <>
  
  <div class="receipt" >
        <header>
            <div id="logo" className="media w-50" data-src="6840541.png" src="6840541.png"> <img src="/assets/img/logo/logo.png" className='w-50' alt=""/></div>
        </header>
        <p class="tx-c fs-18px">{data.branch_name}</p>
        <table class="bill-details"  width="100%">
            <tbody>
                <tr>
                    <td colspan="2">ທີ່ຢູ່: <span>wrewerw wewrew</span></td>
                </tr>
                <tr>
                    <td colspan="2">ໂທລະສັບ/Tel: <span>{data.branch_tel}</span></td>
                </tr>
                <tr>
                    <th rowSpan={2} width={'55%'}>ພ/ງຂາຍ : <span>{data.staffName}</span></th>
                    <td className=''>Bill No: {data.sale_billNo}</td>
                </tr>
                <tr>
                  <td className=''>Date: {moment(data.sale_date).format('DD/MM/YYYY h:mm')}</td>
                </tr>
                <tr>
                    <th colspan="2" class="center-align"><span class=""> ບິນຮັບເງິນສົດ</span></th>
                </tr>
            </tbody>
        </table>

        <table class="items">
            <thead>
                <tr>
                    <th class="heading name">ລາຍການ</th>
                    <th class="heading qty">ຈຳນວນ</th>
                    <th class="heading amount text-end">ລວມເງິນ</th>
                </tr>
            </thead>
            <tbody>
            {data.dataList.map((item, key) => (
            <tr className="service" key={key}>
              <td className="itemtext">{item.tile_name+' '+item.qty_baht+' '+item.option_name}</td>
              <td className="itemtext text-center">{item.order_qty+' '+item.unite_name}</td>
              <td className="itemtext text-end">{numeral(item.price_sale*item.order_qty).format('0,0')}
              {item.price_pattern >0 ? (
                <>
                <br/>
               + {numeral(item.price_pattern*item.order_qty).format('0,00')}
               </>):('')}
              </td>
            </tr>
          ))}
            <tr>
                <td colspan="2" class="sum-up line tx-l">ລວມທັງໝົດ (Subtota) :</td>
                <td class="line price">{numeral(data.balance_total).format('0,00')}</td>
            </tr>
            <tr>
                <td colspan="2" class="sum-up tx-l">ອມພ : %</td>
                <td class="price">{numeral(data.balance_vat).format('0,00')}</td>
            </tr>
            <tr>
                <th colspan="2" class="sum-up bottom tx-l">ລວມເປັນເງິນ :</th>
                <th class="price tx-r bottom">{numeral(data.balance_total).format('0,00')}</th>
            </tr>
            <tr>
                <th colspan="2" class="sum-up  tx-l">ຮັບເງິນສົດ :</th>
                <th class="price tx-r ">{numeral(data.balance_cash).format('0,00')}</th>
            </tr>
            <tr>
                <th colspan="2" class="sum-up  tx-l">ຮັບເງິນໂອນ :</th>
                <th class="price tx-r ">{numeral(data.balance_transfer).format('0,00')}</th>
            </tr>
            {data.balance_return > 0? (
            <tr>
                <th colspan="2" class="sum-up bottom tx-l">ເງິນທອນ :</th>
                <th class="price tx-r bottom">{numeral(data.balance_return).format('0,00')}</th>
            </tr>
            ):''}
            <tr>
                <td className="line bottom pt-2px" colspan="4"></td>
            </tr>
           </tbody>
        </table>
        <section>
            <p>
                ຜຸ້ບັນທຶກ : <span>{data.userName}</span>
                <br />
               <strong>ລາຍຫລະອຽດ: </strong>  {data.sale_remark}
            </p>
        </section>
    </div>
    </>
)};

export default Invoice;
