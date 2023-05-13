import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPrint.css";

const PaymentPrint = () => {
  const {state} = useLocation();
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState();
  const [companyAddress, setCompanyAddress] = useState();
  const [companyContact, setCompanyContact] = useState();
  const [companyEmail, setCompanyEmail] = useState();

  const [paymentDate, setPaymentDate] = useState();
  const [jobID, setJobID] = useState();
  const [paymentTotal,setPaymentTotal] = useState();
  const [inwardProducts,setInwardProducts] = useState([]);

  const [custName, setCustName] = useState();
  const [custContact, setCustContact] = useState();
  const [custEmail, setCustEmail] = useState();

  const [terms, setTerms] = useState();

  useEffect(() => {
    // setTimeout(() => window.print(), 200);
    // window.onafterprint = function(e){
    //   navigate("/PaymentRegister");
    // };
    console.log(state);
    const cust = state.customerData;
    const inward = state.inwardData;
    const payment = state.paymentData;
    const company = state.companyData;
    setCustName(cust.name);
    setCustContact(cust.phone);
    setCustEmail(cust.email);

    setInwardProducts(inward.inwardProducts);

    setJobID(payment.jobID);
    setPaymentDate(payment.paymentDate);
    setPaymentTotal(payment.paidAmount);

    setCompanyName(company.companyName);
    setCompanyAddress(company.address);
    setCompanyEmail(company.email);
    setCompanyContact(company.contact);
    setTerms(company.paymentTC);
  }, []);

  return (
    <div id="invoice">
      <div className="toolbar hidden-print">
        <div className="text-right">
          <button className="btn btn-info" onClick={()=>navigate("/PaymentRegister")}>
            Back
          </button>
          <button className="btn btn-info" onClick={()=>window.print()}>
            Print
          </button>
          <button className="btn btn-info">
            Export as PDF
          </button>
        </div>
        <hr />
      </div>
      <div className="invoice overflow-auto">
        <div style={{ minWidth: "600px" }}>
          <header>
            <div className="row">
              {/* <div className="col">
                <a target="_blank" href="https://lobianijs.com">
                  <img
                    src="https://www.kadencewp.com/wp-content/uploads/2020/10/alogo-1.svg"
                    data-holder-rendered="true"
                    width={100}
                  />
                </a>
              </div> */}
              <div className="col company-details">
                <h2 className="name">
                  {/* <a target="_blank" href="https://lobianijs.com"> */}
                    {companyName}
                  {/* </a> */}
                </h2>
                <div>{companyAddress}</div>
                <div>+91 {companyContact}</div>
                <div>{companyEmail}</div>
              </div>
            </div>
          </header>
          <main>
            <div className="row contacts">
              <div className="col invoice-to">
                <div className="text-gray-light">TO:</div>
                <h2 className="to">{custName}</h2>
                <div className="address">+91 {custContact}</div>
                <div className="email">
                  {/* <a href="mailto:john@example.com">{custEmail}</a> */}
                  {custEmail}
                </div>
              </div>
              <div className="col invoice-details">
                <h1 className="invoice-id">PAYMENT RECEIPT</h1>
                <div className="date">Job ID: {jobID}</div>
                <div className="date">Date: {paymentDate}</div>
              </div>
            </div>
            <table border="0" cellSpacing="0" cellPadding="0">
              <thead>
                <tr>
                  <th>#</th>
                  <th className="text-left">PRODUCT</th>
                  <th className="text-right">SERIAL NO</th>
                  <th className="text-right">PROBLEM</th>
                  <th className="text-right">REMARKS</th>
                </tr>
              </thead>
              <tbody>
                {inwardProducts.map((product,i) => {
                  return (
                    <tr key={product.id}>
                      <td className="no">{i+1}</td>
                      <td className="text-left">{product.products}</td>
                      <td className="text-left">{product.serialNo}</td>
                      <td className="text-left">{product.problem}</td>
                      <td className="text-left">{product.remarks}</td>
                    </tr>
                  );
                })}
              </tbody>
              {/* <tfoot>
                <tr>
                  <td colSpan="2"></td>
                  <td colSpan="2">SUBTOTAL</td>
                  <td>$5,200.00</td>
                </tr>
                <tr>
                  <td colSpan="2"></td>
                  <td colSpan="2">TAX 25%</td>
                  <td>$1,300.00</td>
                </tr>
                <tr>
                  <td colSpan="3"></td>
                  <td
                    style={{
                      borderBottom: "1px solid black",
                      borderLeft: "1px solid black",
                    }}
                  >
                    TOTAL ESTIMATE
                  </td>
                  <td style={{ borderBottom: "1px solid black" }}>₹6,500.00</td>
                </tr>
              </tfoot> */}
            </table>
            <div className="estimate">
              <p>
                TOTAL RECEIVED AMOUNT: ₹{paymentTotal}
              </p>
            </div>
            <div className="thanks"></div>
            <div className="notices">
              <div>Terms & Conditions:</div>
              <div className="notice">{terms}</div>
            </div>
          </main>
          <footer>
            Inward Slip was created on a computer and is valid without the
            signature and seal.
          </footer>
        </div>
        {/* <!--DO NOT DELETE THIS div. IT is responsible for showing footer always at the bottom--> */}
        <div></div>
      </div>
    </div>
  );
};

export default PaymentPrint;
