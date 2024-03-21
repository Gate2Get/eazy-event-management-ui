import { Card, Typography } from "antd";
import React from "react";
import { useBearStore } from "../../store";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  PLAN_NAME_MAP,
  PLAN_TABLE_NOTIFICATION_PRICE_MAP,
  PLAN_TABLE_NOTIFICATION_PRICE_ROWS,
  PLAN_TABLE_ROWS,
} from "./constants";

const { Title } = Typography;

export const MyPlans = () => {
  const { activePlan } = useBearStore.userStore();

  const { screen, currentPage } = useBearStore.appStore();

  const _activePlan: any = activePlan;
  return (
    <>
      <div style={{ margin: screen === "MOBILE" ? 0 : "2rem" }}>
        <Title level={4}>{currentPage}</Title>
        <Title level={5}>Current Active Plan</Title>
        <div>
          <TableContainer
            component={Paper}
            sx={{ padding: screen === "MOBILE" ? 0 : "2rem" }}
          >
            <Table aria-label="plan comparison table">
              <TableBody>
                {PLAN_TABLE_ROWS.map((key) => (
                  <TableRow key={key}>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        fontWeight: "bold",
                        paddingBottom: "12px",
                        paddingTop: "12px",
                      }}
                    >
                      {PLAN_NAME_MAP[key]}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        // border: "1px solid #ddd",
                        paddingBottom: "12px",
                        paddingTop: "12px",
                        textAlign: "left",
                      }}
                    >
                      {_activePlan?.[key] || _activePlan?.[key] === 0
                        ? `${_activePlan?.[key]} out of ${_activePlan?.pricingPlan?.[key]} available`
                        : _activePlan?.pricingPlan?.[key]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div>
          <Title level={5}>Current Plan Notification Credit</Title>
          <TableContainer
            component={Paper}
            sx={{
              border: "1px solid #dddddd",
              padding: screen === "MOBILE" ? 0 : "2rem",
            }}
          >
            <Table aria-label="plan comparison table">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      paddingBottom: "12px",
                      paddingTop: "12px",
                    }}
                  >
                    Plan Details
                  </TableCell>
                  <TableCell
                    // align="center"
                    sx={{
                      // border: "1px solid #ddd",
                      fontWeight: "bold",
                      paddingBottom: "12px",
                      paddingTop: "12px",
                    }}
                  >
                    Credit Required
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {PLAN_TABLE_NOTIFICATION_PRICE_ROWS.map((key) => (
                  <TableRow key={key}>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        fontWeight: "bold",
                        paddingBottom: "12px",
                        paddingTop: "12px",
                      }}
                    >
                      {PLAN_TABLE_NOTIFICATION_PRICE_MAP[key]}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        // border: "1px solid #ddd",
                        paddingBottom: "12px",
                        paddingTop: "12px",
                        textAlign: "left",
                      }}
                    >
                      {_activePlan?.pricingPlan[key]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};
