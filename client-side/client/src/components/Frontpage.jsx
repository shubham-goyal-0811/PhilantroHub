import itachi from '../img/itachi.jpg';
export default function Frontpage() {
    return (
        <>
            <div className="frontpage_main flex w-full items-center" style={{ padding: '1%', height: '90vh',backgroundColor:'#faf9f6' }}>
                <div className="frontpape_main2 w-full" style={{ height: '100%' }}>
                    <div className="title flex justify-center" style={{ marginTop: '1%' }}>
                        <div className="t1 text-7xl">
                            <span className="inline-block">P</span><span className="inline-block">H</span><span className="inline-block">I</span><span className="inline-block">L</span><span className="inline-block">A</span><span className="inline-block">N</span><span className="inline-block">T</span><span className="inline-block">R</span><span className="inline-block">O</span>
                        </div>
                        <div className="t2 text-7xl">
                            <span className="inline-block">H</span><span className="inline-block">U</span><span className="inline-block">B</span>
                        </div>
                    </div>

                    <div className="front_content flex items-center w-full" style={{ height: '90%' }}>
                        <div className="picture w-2/5">
                            <div className="act_pic">
                                <img src={itachi} alt="" className="rounded-full" />
                            </div>
                        </div>
                        <div className="quotes w-3/5 flex items-center text-center" style={{ margin: '1%', height: '40%' }}>
                            <div className="act_qot">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic sapiente temporibus non, voluptatibus ut quidem omnis molestias, iure quaerat, dolorem ullam quasi impedit deserunt rem cum molestiae earum? Quibusdam autem sequi non, hic tenetur eum modi, recusandae voluptates nobis repudiandae id aspernatur eveniet tempore eligendi cum ipsa officiis nulla nemo.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
