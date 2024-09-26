import Location from "@/svgs/location/page"
import School from "@/svgs/school/page";
import Link from "next/link";

export default async function Home() {
  const { users } = await fetch("https://dummyjson.com/users").then(res => res.json());

  return (
    <div className="homeContainer">
      {users.map(x => (
        <div className="users" key={x.id}>
          <div className="usersImportInfo">
          <img src={x.gender === "female" ? "/female.png" : "/man.png"}
            alt={`${x.firstName}'s profile image`}
            className="profileImage"
          />
            <h3>{x.firstName} {x.lastName}</h3>
            <strong>@{x.username}</strong>

          </div>
          <div className="userInform">
          
            <div className="location"> <Location /> <p> {x.address.country}</p> </div>
            <div className="location"> <School /> <p> {x.university}</p> </div>
          </div>
            <Link href={`/users/${x.id}`} className="seeProfile">see profile</Link>
        </div>
      ))}
    </div>
  );
}
