import Shwetank from '../../img/shwetank.png';
import Shubham from '../../img/goyal.png';
import Siddham from '../../img/siddham.png';

export default function Page4() {
    return (
        <>
            <div className="frontpage_main4 flex flex-col w-auto items-center">
                <div className="frontpage_part4 w-full">
                    <div className="flex text-4xl font-bold flex justify-center">
                        <h1>Know Our Team</h1>
                    </div>

                    <div className="pps flex h-full">
                        <div className="shwetank flex bg-slate-100 rounded-3xl" style={{ margin: '2%' }}>
                            <div className="shwetapp bg-cover bg-center w-80 h-80"
                                style={{ backgroundImage: `url(${Shwetank})`, padding: '1%' }}>
                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
