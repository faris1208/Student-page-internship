"use client";
import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";


const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const auth = getAuth()
  
  const handleLogout = async () => {
    try {
      // If using Firebase Authentication
      await signOut(auth);

      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const sidebarMenu = [
    {
      id: 1,
      menuItem: "Student Page",
      link: "dashboard",
    },
   
   
  ];
  return (
    <aside className={styles.wrapper}>
        <h2>Dashboard</h2>
      <div className={styles.sidebar_menu_wrapper}>
        <ul className={styles.sidebar_menu}>
          {sidebarMenu.map((item) => (
            <Link key={item.id} href={item.link}>
              <li
                className={
                  pathname == item.link
                    ? styles.active_sidebar_item
                    : styles.sidebar_item
                }
              >
                {item.icon} <span>{item.menuItem}</span>{" "}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className={styles.logout}>
        <div
         className={styles.logout_btn}
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
           Logout
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
