import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
export default function Frontpage() {
    return (
        <>
            <div className="main1 flex flex-col">
                <div className=""><Page1/></div>
                <div className=""><Page2/></div>
                <div className=""><Page3/></div>
                <div className=""><Page4/></div>
            </div>
        </>
    );
}
