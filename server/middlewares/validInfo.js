module.exports = (req, res, next) => {
    const { username, email, password, confirmed_password, contact_no, profile_img, full_name, gender, staff_status} = req.body;
    console.log(username, email, password, contact_no, profile_img, full_name, gender, staff_status);
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/register") {
      console.log(confirmed_password, password);
      if(confirmed_password !== password){
        return res.status(401).json("Passwords do not match");
      }

      if (![username, email, password, contact_no, full_name, gender, staff_status].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.status(401).json("Invalid Email");
      }
    } 
    
    else if (req.path === "/login") {
      console.log('eikhane ashos naki');
      if (![email, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.status(401).json("Invalid Email");
      }
    }
  
    next();
  };