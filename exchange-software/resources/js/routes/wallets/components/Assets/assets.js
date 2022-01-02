import React, {useMemo} from "react";
import {defineMessages, FormattedMessage, useIntl} from "react-intl";
import IconBuilder from "components/IconBuilder";
import WalletAccount from "models/WalletAccount";
import {useWalletAccounts, useActiveWalletAccount} from "hooks/account";
import AddAccount from "../AddAccount";
import Balance from "./components/Balance";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Typography,
    useMediaQuery
} from "@mui/material";
import {experimentalStyled as styled} from "@mui/material/styles";
import Table from "components/Table";
import starSFill from "@iconify-icons/ri/star-s-fill";
import LinearProgressWithLabel from "components/LinearProgressWithLabel";
import {Icon} from "@iconify/react";

const messages = defineMessages({
    title: {defaultMessage: "Your Assets"},
    coin: {defaultMessage: "Coin"},
    balance: {defaultMessage: "Balance"},
    available: {defaultMessage: "Available"},
    quota: {defaultMessage: "Quota"}
});

const Assets = () => {
    const {data, loading} = useWalletAccounts();
    const activeAccount = useActiveWalletAccount();
    const intl = useIntl();
    const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    const columns = useMemo(() => {
        return [
            {
                headerName: intl.formatMessage(messages.coin),
                field: "coin",
                minWidth: 100,
                flex: 1,
                renderCell: (params) => {
                    const account = WalletAccount.use(params.row);
                    const icon = account.wallet.coin.svgIcon();
                    return (
                        <CoinStyle>
                            <IconBuilder sx={{fontSize: "25px"}} icon={icon} />

                            <Box component="span" sx={{marginLeft: "10px"}}>
                                {account.wallet.coin.name}
                            </Box>

                            {activeAccount.id === account.id && (
                                <Box
                                    sx={{display: "flex", ml: 1}}
                                    component="span">
                                    <Icon icon={starSFill} />
                                </Box>
                            )}
                        </CoinStyle>
                    );
                }
            },
            {
                headerName: intl.formatMessage(messages.available),
                field: "available",
                minWidth: 100,
                flex: 1,
                sortable: true,
                type: "number",
                renderCell: (params) => {
                    const account = WalletAccount.use(params.row);
                    return (
                        <BalanceStyle>
                            <Typography variant="subtitle2">
                                {account.available}
                            </Typography>
                            <Typography
                                sx={{color: "text.secondary"}}
                                variant="caption">
                                {account.formatted_available_price}
                            </Typography>
                        </BalanceStyle>
                    );
                }
            },
            {
                headerName: intl.formatMessage(messages.balance),
                field: "balance",
                minWidth: 100,
                flex: 1,
                sortable: true,
                type: "number",
                renderCell: (params) => {
                    const account = WalletAccount.use(params.row);
                    return (
                        <BalanceStyle>
                            <Typography variant="subtitle2">
                                {account.balance}
                            </Typography>
                            <Typography
                                sx={{color: "text.secondary"}}
                                variant="caption">
                                {account.formatted_balance_price}
                            </Typography>
                        </BalanceStyle>
                    );
                }
            },
            {
                field: "quota",
                headerName: intl.formatMessage(messages.quota),
                minWidth: 100,
                flex: 1,
                hide: smDown,
                valueGetter: (params) => {
                    return params.row.available_price_quota;
                },
                sortable: true,
                renderCell: (params) => {
                    const record = params.row;
                    return (
                        <LinearProgressWithLabel
                            value={record.available_price_quota}
                        />
                    );
                }
            }
        ];
    }, [intl, activeAccount, smDown]);

    return (
        <Card>
            <CardHeader
                title={intl.formatMessage(messages.title)}
                action={<AddAccount />}
            />

            <CardContent>
                <TotalBalanceStyle sx={{my: 3, textAlign: "center"}}>
                    <Typography variant="h3">
                        <Balance />
                    </Typography>

                    <Typography variant="subtitle2">
                        <FormattedMessage defaultMessage="Total Balance" />
                    </Typography>
                </TotalBalanceStyle>
            </CardContent>

            <Table
                columns={columns}
                rows={data}
                rowHeight={60}
                loading={loading}
            />
        </Card>
    );
};

const CoinStyle = styled("div")({
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    flexBasis: 0
});

const TotalBalanceStyle = styled("div")({
    display: "flex",
    flexDirection: "column"
});

const BalanceStyle = styled("div")({
    display: "flex",
    flexDirection: "column"
});

export default Assets;
