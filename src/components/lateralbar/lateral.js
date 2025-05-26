import { Button } from "../../components/button/button.js";
import { useNavigate } from "react-router-dom";
export const LateralBar = ({className, children}) => {
    const navigate = useNavigate();
    return (
        <div className={className}>
            
            <Button
                    onClick={() => navigate('/')}
                    text="Sair"
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg h-10 w-full flex justify-center items-center hover:shadow-lg text-lg"
                />
                {children}
        </div>
    )
}