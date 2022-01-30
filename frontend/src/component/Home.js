import Card from "./Card";

const Home = () =>{
    return <div className="h-full w-full px-10 py-2"> 
                <div className="grid sm:grid-cols-1 md:grid-cols-3  gap-5 justify-center ">
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                </div>
    </div>
};

export default Home;