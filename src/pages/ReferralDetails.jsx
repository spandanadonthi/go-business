import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";

function ReferralDetails() {
  const { id } = useParams();

  const [referral, setReferral] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReferralDetails();
  }, []);

  const getReferralDetails = async () => {
    const token = Cookies.get("jwt_token");

    const url = `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals?id=${id}`;

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        if (data.data.id) {
          setReferral(data.data);
        } else if (data.data.referrals) {
          setReferral(data.data.referrals[0]);
        } else {
          setReferral(null);
        }
      } else {
        setReferral(null);
      }
    } catch (error) {
      setReferral(null);
    }

    setLoading(false);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (referral === null) {
    return (
      <div>
        <h1>Referral not found</h1>

        <Link to="/">Back to dashboard</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Referral Details</h1>

      <h2>{referral.name}</h2>

      <p>
        <strong>Referral ID:</strong> {referral.id}
      </p>

      <p>
        <strong>Service Name:</strong> {referral.serviceName}
      </p>

      <p>
        <strong>Date:</strong>{" "}
        {referral.date.replace(/-/g, "/")}
      </p>

      <p>
        <strong>Profit:</strong>{" "}
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(referral.profit)}
      </p>

      <br />

      <Link to="/">← Back to dashboard</Link>
    </div>
  );
}

export default ReferralDetails;