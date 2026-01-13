import { useState } from "react";
import { API } from "../../api";
import { JSEncrypt } from "jsencrypt";
import axios from "axios";

const Home = () => {
  const [text, setText] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const encryptor = new JSEncrypt();
    const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1oPV6JCZUNzro3heK3II
XmRp9LtFZvzzXBJK8l3U24tIZayZJ/ddcKf0jDR1tRW3mYnWRIuhF60kyOR5iDX3
qzosZkegnQ5L82JN0rq6HDtsdfLmB+pEfNkxTM8f5puE+RJeB80FTq0GpCj3sKs5
qCPvTqH2RHDIT0WcXT7DDLOjwAJJHoCVfvBqmMptHir1a1izUlIPXHPYuZ5EMpLu
9KEa5nEVVN+urW4uhYAgjMf/p+8ElcqkpdFNNHFsglSzPyt0cHtwQka0FjQuiX8x
+XsrTOQHSOHz+NG6MUA2OB2Ay7YgtAq4JxbP0J6896QGv1wYwQTG74QWBy1NuolI
owIDAQAB
-----END PUBLIC KEY-----`;

    encryptor.setPublicKey(publicKey);
    const encrypted = encryptor.encrypt(JSON.stringify(text));

    const { data } = await axios.post(API.decrypt, { token: encrypted });
    console.log(data);
  };
  return (
    <div className="h-screen w-full flex  items-center justify-center">
      <form className="flex flex-col gap-y-5" onSubmit={onSubmit}>
        <input
          className="border px-3 py-2 rounded"
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="type anything"
        />
        <button className="px-2 py-1 bg-green-600" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;
