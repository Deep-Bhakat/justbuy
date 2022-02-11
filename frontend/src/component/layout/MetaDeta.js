import Helmet from 'react-helmet'
const MetaDeta = (props) =>{
    return <Helmet>
        <title>{props.title} - JustBuy</title>
    </Helmet>
};

export default MetaDeta;