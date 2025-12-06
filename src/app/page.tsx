'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Home() {
  const route = useRouter()
  const user = useSelector((state:any) => state.auth.userData)
  return (
    <>
      {
        user.length ? (<div>status</div>): (
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage:
                "url(https://images.pexels.com/photos/6275215/pexels-photo-6275215.jpeg)",
            }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-ld">
                <h1 className="mb-5 text-5xl lg:text-7xl font-bold">Craving Something Tasty?</h1>
                <div className="mb-5 w-full flex justify-center  ">
                <p className="lg:w-1/2" >
                  From spicy street food to premium gourmet dishes — we bring the flavors you love right to your home.
                  Fresh ingredients, fast delivery, and satisfaction guaranteed.
                </p>
                </div>
                <button onClick={ () => route.push('/region') }  className="btn btn-primary">View Store</button>
              </div>
            </div>
        </div>
        )
      }
    </>
  );
}
