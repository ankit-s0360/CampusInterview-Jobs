import { useNavigate } from "react-router-dom";

function NotFound(){
    const navigate = useNavigate();
    return(
        <div className="container mt-4">
            <div className="row">
                <div className="d-flex justify-content-center align-items-center" style={{minHeight:"80vh"}}>
                    <div>
                        <h2 className="text-center text-danger">404</h2>
                        <h5 className="text-center">Page not found...</h5>
                        <div className="text-center">
                            <button className="btn btn-outline-primary rounded btn-sm">
                                <span onClick={() => navigate(-1)}>Go Back</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NotFound;