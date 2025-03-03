import Logo from "../assets/images/logo.png";
function ForgetPass() {
  return (
    // <div className=' vh-100'>
    //     <div>
    //         <img src={Logo} alt="" />
    //     </div>
    //     <div>
    //         <h3>Forget Password</h3>
    //         <h5>Enter your emailId</h5>
    //         <input type="text" />
    //     </div>
    // </div>
    <div className=" d-flex justify-content-center align-items-center w-auto h-auto  " >
      <div className="text-center">
        {/* Logo */}
        <div className="mb-4">
          <img
            src={Logo}
            alt="Logo"
            className="img-fluid"
            style={{ maxWidth: "80px" }}
          />
        </div>

        {/* Forget Password Form */}
        <div className="bg-light p-4 rounded shadow">
          <h2 className="mb-3">Forgot Password</h2>
          <p className="mb-3">
            Please enter your email to reset your password.
          </p>
          <form>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ForgetPass;
