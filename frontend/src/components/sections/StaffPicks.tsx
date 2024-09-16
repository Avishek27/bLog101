import MiniBlogCard from "./MiniBlogCard";

export default function StaffPicks () {
    return (
       <section className="p-10">
        <div className="flex flex-col">
          <div className="text-xl font-bold ">
            Staff Picks
          </div>
          <MiniBlogCard/>
          <MiniBlogCard/>
          <MiniBlogCard/>
        </div>
       </section>
    )
}