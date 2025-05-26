import logo from '../../image/imageLogo/20250511_1623_Logo_TalkChat_Moderno_simple_compose_01jv0ct60nebcatjjfh8vcy5xh-removebg-preview.png'

export const Imagelogo = ({width,height}) => {
    return <div>
        <img src={logo} alt='Logo' width={width != null ? width : 50} height={height != null ? height : 50}></img>
    </div>
}