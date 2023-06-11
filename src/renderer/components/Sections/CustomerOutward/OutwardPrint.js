import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OutwardPrint.css";

const OutwardPrint = () => {
  const {state} = useLocation();
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("Shivam Computers");
  const [companyAddress, setCompanyAddress] = useState(
    "E-242 Sumel Business Park-6, Dudheswar Road, Ahmedabad"
  );
  const [companyContact, setCompanyContact] = useState("9725494292");
  const [companyEmail, setCompanyEmail] = useState("patel_sunil7476@yahoo.in");

  const [invoiceDate, setInvoiceDate] = useState("18/12/2022");
  const [jobID, setJobID] = useState("MNK001");
  const [outwardTotal,setOutwardTotal] = useState("1000");
  const [inwardProducts,setInwardProducts] = useState([]);

  const [custName, setCustName] = useState("Manank Patel");
  const [custContact, setCustContact] = useState("8511443237");
  const [custEmail, setCustEmail] = useState("patel.manank144@gmail.com");

  const [terms, setTerms] = useState(
    "Items should be collected within 30 days after approval of estimate."
  );

  useEffect(() => {
    // setTimeout(() => window.print(), 50);
    // window.onafterprint = function(e){
    //   navigate("/CustomerOutward");
    // };
    console.log(state);
    const cust = state.customerData;
    const inward = state.inwardData;
    const outward = state.outwardData;
    const company = state.companyData;
    setCustName(cust.name);
    setCustContact(cust.phone);
    setCustEmail(cust.email);
    setJobID(inward.jobID);
    setInvoiceDate(outward.invoiceDate);
    setInwardProducts(inward.inwardProducts);
    setOutwardTotal(outward.totalCharge);
    setCompanyName(company.companyName);
    setCompanyAddress(company.address);
    setCompanyEmail(company.email);
    setCompanyContact(company.contact);
    setTerms(company.outwardTC);
  }, []);

  const DUMMY_DATA = [
    {
      id: 1,
      products: "Lenovo Laptop",
      serialNo: "LEN001",
      problem: "Display Not Working",
      remarks: "Half Paid Already",
    },
    {
      id: 2,
      products: "Dell Laptop",
      serialNo: "DEL001",
      problem: "Keyboard Not Working",
      remarks: "Full Paid Already",
    },
  ];

  return (
    <div id="invoice">
     <div className="toolbar hidden-print">
        <div className="text-right">
          <button className="btn btn-info" onClick={()=>navigate("/OutwardRegister")}>
            Back
          </button>
          <button className="btn btn-info" onClick={()=>window.print()}>
            Print
          </button>
          {/* <button className="btn btn-info">
            Export as PDF
          </button> */}
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
                <div className="text-gray-light">OUTWARD TO:</div>
                <h2 className="to">{custName}</h2>
                <div className="address">+91 {custContact}</div>
                <div className="email">
                  {/* <a href="mailto:john@example.com">{custEmail}</a> */}
                  {custEmail}
                </div>
              </div>
              <div className="col invoice-details">
                <h1 className="invoice-id">OUTWARD SLIP</h1>
                <div className="date">Job ID: {jobID}</div>
                <div className="date">Date of Invoice: {invoiceDate}</div>
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
                TOTAL BILLED AMOUNT: ₹{outwardTotal}
              </p>
            </div>
            <div className="thanks"></div>
            <div className="notices">
              <div>Terms & Conditions:</div>
              <div className="notice">{terms}</div>
            </div>
          </main>
          <footer>
            Outward Slip was created on a computer and is valid without the
            signature and seal.
          </footer>
        </div>
        {/* <!--DO NOT DELETE THIS div. IT is responsible for showing footer always at the bottom--> */}
        <div></div>
      </div>
    </div>
  );
};

export default OutwardPrint;
