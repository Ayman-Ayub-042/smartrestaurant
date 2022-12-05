import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "../styles/footer.css";

const Footer = ({postsPerPage, totalPosts, paginate},props) => {
  
  const pageNumbers =[];
    for(let i=1; i<=Math.ceil(totalPosts/postsPerPage); i++){
        pageNumbers.push(i);}
  return (
    <div className="footer">
   
      <div style={props.contentStyle} >
        Page 
        {pageNumbers.map(number =>( 
        <div onClick={() => paginate(number)}>
        <IoIosArrowBack className="icon active" /> {number}
        
        <IoIosArrowForward className="icon active"  key={number} onClick={() => paginate(number)} /> 
       </div> ))}</div>
     
      
    </div>
  );
};

export default Footer;
