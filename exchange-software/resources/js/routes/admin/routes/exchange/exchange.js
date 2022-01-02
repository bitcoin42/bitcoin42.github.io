import React, {useMemo} from "react";
import PageTabs from "components/PageTabs";
import {defineMessages, useIntl} from "react-intl";
import exchangeDollar from "@iconify-icons/ri/exchange-dollar-fill";
import BuySell from "./components/BuySell";

const messages = defineMessages({
    buySell: {defaultMessage: "Buy & Sell"},
    title: {defaultMessage: "Exchange"}
});

const Exchange = () => {
    const intl = useIntl();

    const tabs = useMemo(() => {
        return [
            {
                value: "buy-sell",
                label: intl.formatMessage(messages.buySell),
                icon: exchangeDollar,
                component: <BuySell />
            }
        ];
    }, [intl]);

    return (
        <PageTabs
            initial="buy-sell"
            title={intl.formatMessage(messages.title)}
            tabs={tabs}
        />
    );
};

export default Exchange;
