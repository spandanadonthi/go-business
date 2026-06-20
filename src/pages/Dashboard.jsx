import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
    const token = Cookies.get("jwt_token");

    const url =
      "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals";

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (response.ok) {
        setData(result.data);
      } else {
        setErrorMsg(result.message || "Failed to load data");
      }
    } catch (error) {
      setErrorMsg("Something went wrong");
    }

    setLoading(false);
  };

  const logout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (errorMsg !== "") {
    return <h2>{errorMsg}</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2>Go Business</h2>

        <button onClick={logout}>Log out</button>
      </nav>

      <h1>Referral Dashboard</h1>

      <p>
        Track your referrals, earnings, and partner activity in one place.
      </p>

      <hr />

      <h2>Overview</h2>

      <div>
        {data.metrics.map((item) => (
          <div key={item.id} style={{ marginBottom: "10px" }}>
            <h4>{item.label}</h4>
            <p>{item.value}</p>
          </div>
        ))}
      </div>

      <hr />

      <h2>Service summary</h2>

      <p>
        <strong>Service:</strong> {data.serviceSummary.service}
      </p>

      <p>
        <strong>Your Referrals:</strong>{" "}
        {data.serviceSummary.yourReferrals}
      </p>

      <p>
        <strong>Active Referrals:</strong>{" "}
        {data.serviceSummary.activeReferrals}
      </p>

      <p>
        <strong>Total Ref. Earnings:</strong>{" "}
        {data.serviceSummary.totalRefEarnings}
      </p>

      <hr />

      <h2>Refer friends and earn more</h2>

      <div>
        <p>Your Referral Link</p>
        <input
          readOnly
          value={data.referral.link}
          style={{ width: "350px" }}
        />
      </div>

      <br />

      <div>
        <p>Your Referral Code</p>
        <input
          readOnly
          value={data.referral.code}
          style={{ width: "350px" }}
        />
      </div>

      <hr />

      <h2>All referrals</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Service</th>
            <th>Date</th>
            <th>Profit</th>
          </tr>
        </thead>

        <tbody>
          {data.referrals.map((item) => (
            <tr
              key={item.id}
              onClick={() => navigate(`/referral/${item.id}`)}
              style={{ cursor: "pointer" }}
            >
              <td>{item.name}</td>

              <td>{item.serviceName}</td>

              <td>{item.date.replace(/-/g, "/")}</td>

              <td>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(item.profit)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;