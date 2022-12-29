function Card(){
    const { useState } = React;
    const mainClassName = "social hide";
    const close_button = "close-button";
    const [classname,setClassname] = useState(mainClassName);
    const[close,setClosebutton] = useState(close_button);
    
    function Toggle(){
        
        if(classname == "social"){
        setClassname("social hide");
        setClosebutton("close-button");
        }else{
            setClassname("social");
            setClosebutton("close-button close-button-rotate");
        }
    }
    
     
       
    return(
    <> 
    <div className="wrapper"> 
      <a className={classname} href="#"><i className="fa fa-file"></i></a> 
      <a className={classname} href="#"><i className="fa fa-image"></i></a> 
      <a className={classname} href="#"> <i className="fa fa-print"></i></a> 
      <a className={close} onClick={Toggle} href="#"> <i className="fa fa-plus"></i></a>
    </div> 
    </> 
        );
}



