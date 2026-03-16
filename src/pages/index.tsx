import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const IndexPage: NextPage = () => {
    const { push } = useRouter();

    useEffect(() => {
        push('/products');
    }, [push]);

    return null;
}

export default IndexPage;