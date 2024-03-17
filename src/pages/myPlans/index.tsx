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
import { PLAN_NAME_MAP, PLAN_TABLE_ROWS } from "./constants";

const { Title } = Typography;

export const MyPlans = () => {
  const { activePlan } = useBearStore.userStore();

  const _activePlan: any = activePlan;
  return (
    <div>
      <Title level={3}>Current Plan</Title>
      <TableContainer component={Paper} sx={{ border: "1px solid #dddddd" }}>
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
                align="center"
                sx={{
                  border: "1px solid #ddd",
                  fontWeight: "bold",
                  paddingBottom: "12px",
                  paddingTop: "12px",
                }}
              >
                Actual Plan
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  paddingBottom: "12px",
                  paddingTop: "12px",
                }}
              >
                Available Plan
              </TableCell>
            </TableRow>
          </TableHead>
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
                    border: "1px solid #ddd",
                    paddingBottom: "12px",
                    paddingTop: "12px",
                  }}
                >
                  {_activePlan?.pricingPlan[key]}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ paddingBottom: "12px", paddingTop: "12px" }}
                >
                  {_activePlan?.[key]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
