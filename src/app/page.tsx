"use client";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Fab,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"; // Use the correct Grid component

export default function Home() {
  const [open, setOpen] = useState(false);
  const [selectedRecurrence, setSelectedRecurrence] = useState("daily");
  const [dailyRecurrence, setDailyRecurrence] = useState("every");
  const [weeklyRecurrence, setWeeklyRecurrence] = useState("every");
  const [everyDays, setEveryDays] = useState(1); // State for the input value for "Every {x} day(s)"
  const [selectedDays, setSelectedDays] = useState<string[]>([]); // For selected days
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState("monday"); // Dropdown for day of week
  const [selectedWeekNumber, setSelectedWeekNumber] = useState("first"); // Dropdown for week number (1-5)
  const [selectedMonth, setSelectedMonth] = useState("january");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleMonthChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedMonth(event.target.value as string);
  };
  const handleEveryDaysChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value ? parseInt(event.target.value, 10) : 1;
    setEveryDays(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
      ? parseInt(event.target.value, 10)
      : new Date().getFullYear();
    setSelectedYear(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const email = formJson.email;
    console.log(email);
    handleClose();
  };

  const handleRecurrenceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedRecurrence(event.target.value);
  };

  const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedDays((prev) =>
      checked ? [...prev, value] : prev.filter((day) => day !== value)
    );
  };

  const handleDayOfWeekChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedDayOfWeek(event.target.value as string);
  };

  const handleWeekNumberChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedWeekNumber(event.target.value as number);
  };

  const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const getDaysInMonth = (month: string, year: number) => {
    switch (month) {
      case "february":
        return isLeapYear(year) ? 29 : 28;
      case "april":
      case "june":
      case "september":
      case "november":
        return 30;
      default:
        return 31;
    }
  };

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex">
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
          PaperProps={{
            component: "form",
            sx: {
              width: "80%",
              maxWidth: "800px",
            },
            onSubmit: handleSubmit,
          }}
        >
          {/* <DialogTitle>Recurrence Pattern</DialogTitle> */}
          <DialogContent>
            <DialogContentText>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1} alignItems="center">
                  {" "}
                  {/* Added alignItems to vertically center items if needed */}
                  <Grid item xs={4}>
                    <Box
                      sx={{
                        backgroundColor: "#fff",
                        padding: 1,
                        textAlign: "center",
                        color: "text.secondary",
                        borderRadius: 1,
                      }}
                    >
                      <FormControl>
                        <FormLabel id="recurrence-radio-group-label">
                          Recurrence
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="recurrence-radio-group-label"
                          defaultValue="daily"
                          name="recurrence"
                          value={selectedRecurrence}
                          onChange={handleRecurrenceChange}
                        >
                          <FormControlLabel
                            value="daily"
                            control={<Radio />}
                            label="Daily"
                          />
                          <FormControlLabel
                            value="weekly"
                            control={<Radio />}
                            label="Weekly"
                          />
                          <FormControlLabel
                            value="monthly"
                            control={<Radio />}
                            label="Monthly"
                          />
                          <FormControlLabel
                            value="yearly"
                            control={<Radio />}
                            label="Yearly"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={8}>
                    {selectedRecurrence === "daily" && (
                      <Box>
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="recurrence-radio-group-label"
                            defaultValue="every"
                            name="recurrence"
                            value={dailyRecurrence}
                            onChange={handleRecurrenceChange}
                          >
                            <FormControlLabel
                              value="every"
                              control={<Radio />}
                              label={
                                <Box display="flex" alignItems="center">
                                  Every
                                  <TextField
                                    type="number"
                                    inputProps={{ min: 1 }}
                                    value={everyDays}
                                    onChange={handleEveryDaysChange}
                                    sx={{ width: 60, mx: 1 }}
                                  />
                                  day(s)
                                </Box>
                              }
                            />

                            <FormControlLabel
                              value="everyWeekDay"
                              control={<Radio />}
                              label="Every Week Day"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    )}
                    {selectedRecurrence === "weekly" && (
                      <Box>
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="recurrence-radio-group-label"
                            defaultValue="every"
                            name="recurrence"
                            value={weeklyRecurrence}
                            onChange={handleRecurrenceChange}
                          >
                            <FormControlLabel
                              value="every"
                              control={<Radio />}
                              label={
                                <Box display="flex" alignItems="center">
                                  Recur
                                  <TextField
                                    type="number"
                                    inputProps={{ min: 1 }}
                                    value={everyDays}
                                    onChange={handleEveryDaysChange}
                                    sx={{ width: 60, mx: 1 }}
                                  />
                                  weeks(s) on :
                                </Box>
                              }
                            />
                            <Grid item xs={12}>
                              <Box display="flex" flexWrap="wrap">
                                <Grid container spacing={1}>
                                  {/* First row with 4 checkboxes */}
                                  <Grid item xs={3}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          value="monday"
                                          onChange={handleDayChange}
                                        />
                                      }
                                      label="Monday"
                                    />
                                  </Grid>
                                  <Grid item xs={3}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          value="tuesday"
                                          onChange={handleDayChange}
                                        />
                                      }
                                      label="Tuesday"
                                    />
                                  </Grid>
                                  <Grid item xs={3}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          value="wednesday"
                                          onChange={handleDayChange}
                                        />
                                      }
                                      label="Wednesday"
                                    />
                                  </Grid>
                                  <Grid item xs={3}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          value="thursday"
                                          onChange={handleDayChange}
                                        />
                                      }
                                      label="Thursday"
                                    />
                                  </Grid>

                                  {/* Second row with 3 checkboxes */}
                                  <Grid item xs={3}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          value="friday"
                                          onChange={handleDayChange}
                                        />
                                      }
                                      label="Friday"
                                    />
                                  </Grid>
                                  <Grid item xs={3}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          value="saturday"
                                          onChange={handleDayChange}
                                        />
                                      }
                                      label="Saturday"
                                    />
                                  </Grid>
                                  <Grid item xs={3}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          value="sunday"
                                          onChange={handleDayChange}
                                        />
                                      }
                                      label="Sunday"
                                    />
                                  </Grid>
                                </Grid>
                              </Box>
                            </Grid>

                            <FormControlLabel
                              value="everyWeekDay"
                              control={<Radio />}
                              label="Every Week Day"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    )}
                    {selectedRecurrence === "monthly" && (
                      <Box>
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="recurrence-radio-group-label"
                            defaultValue="every"
                            name="recurrence"
                            value={weeklyRecurrence}
                            onChange={handleRecurrenceChange}
                          >
                            <FormControlLabel
                              value="every"
                              control={<Radio />}
                              label={
                                <Box display="flex" alignItems="center">
                                  Day
                                  <TextField
                                    type="number"
                                    inputProps={{ min: 1 }}
                                    value={everyDays}
                                    onChange={handleEveryDaysChange}
                                    sx={{ width: 60, mx: 1 }}
                                  />
                                  of every
                                  <TextField
                                    type="number"
                                    inputProps={{ min: 1 }}
                                    value={everyDays}
                                    onChange={handleEveryDaysChange}
                                    sx={{ width: 60, mx: 1 }}
                                  />
                                  Month(s)
                                </Box>
                              }
                            />

                            <FormControlLabel
                              value="every"
                              control={<Radio />}
                              label={
                                <Box display="flex" alignItems="center">
                                  The
                                  <Select
                                    labelId="day-of-week-select-label"
                                    id="day-of-week-select"
                                    value={selectedWeekNumber}
                                    label="Day of Week"
                                    onChange={handleWeekNumberChange}
                                  >
                                    <MenuItem value="first">First</MenuItem>
                                    <MenuItem value="second">Second</MenuItem>
                                    <MenuItem value="third">Third</MenuItem>
                                    <MenuItem value="fourth">Fourth</MenuItem>
                                    <MenuItem value="fifth">Fifth</MenuItem>
                                  </Select>
                                  <Select
                                    labelId="day-of-week-select-label"
                                    id="day-of-week-select"
                                    value={selectedDayOfWeek}
                                    label="Day of Week"
                                    onChange={handleDayOfWeekChange}
                                  >
                                    <MenuItem value="monday">Monday</MenuItem>
                                    <MenuItem value="tuesday">Tuesday</MenuItem>
                                    <MenuItem value="wednesday">
                                      Wednesday
                                    </MenuItem>
                                    <MenuItem value="thursday">
                                      Thursday
                                    </MenuItem>
                                    <MenuItem value="friday">Friday</MenuItem>
                                    <MenuItem value="saturday">
                                      Saturday
                                    </MenuItem>
                                    <MenuItem value="sunday">Sunday</MenuItem>
                                  </Select>
                                  of every
                                  <TextField
                                    type="number"
                                    inputProps={{ min: 1 }}
                                    value={everyDays}
                                    onChange={handleEveryDaysChange}
                                    sx={{ width: 60, mx: 1 }}
                                  />
                                  Month(s)
                                </Box>
                              }
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    )}
                    {selectedRecurrence === "yearly" && (
                      <Box>
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="recurrence-radio-group-label"
                            defaultValue="every"
                            name="recurrence"
                            value={dailyRecurrence}
                            onChange={handleRecurrenceChange}
                          >
                            {/* Radio Button with Input for Recur every X years */}
                            <FormControlLabel
                              value="every"
                              control={<Radio />}
                              label={
                                <Box display="flex" alignItems="center">
                                  {/* Label and input box for year(s) */}
                                  Recur every
                                  <TextField
                                    type="number"
                                    inputProps={{ min: 1 }}
                                    value={everyDays}
                                    onChange={handleEveryDaysChange}
                                    sx={{ width: 60, mx: 1 }}
                                  />
                                  year(s)
                                </Box>
                              }
                            />

                            {/* Radio Button for 'On' with Select for Month and Day */}
                            <FormControlLabel
                              value="everyWeekDay"
                              control={<Radio />}
                              label={
                                <Box display="flex" alignItems="center">
                                  {/* Label for 'On' */}
                                  On:
                                  {/* Month Dropdown */}
                                  <Select
                                    labelId="month-select-label"
                                    id="month-select"
                                    value={selectedMonth}
                                    onChange={handleMonthChange}
                                  >
                                    <MenuItem value="january">January</MenuItem>
                                    <MenuItem value="february">
                                      February
                                    </MenuItem>
                                    <MenuItem value="march">March</MenuItem>
                                    <MenuItem value="april">April</MenuItem>
                                    <MenuItem value="may">May</MenuItem>
                                    <MenuItem value="june">June</MenuItem>
                                    <MenuItem value="july">July</MenuItem>
                                    <MenuItem value="august">August</MenuItem>
                                    <MenuItem value="september">
                                      September
                                    </MenuItem>
                                    <MenuItem value="october">October</MenuItem>
                                    <MenuItem value="november">
                                      November
                                    </MenuItem>
                                    <MenuItem value="december">
                                      December
                                    </MenuItem>
                                  </Select>
                                  {/* Day Input */}
                                  <TextField
                                    type="number"
                                    value={1}
                                    onChange={handleDayChange}
                                    sx={{ width: 60, mx: 1 }}
                                  />
                                </Box>
                              }
                            />

                            <FormControlLabel
                              value="everyWeekDay"
                              control={<Radio />}
                              label={
                                <Box display="flex" alignItems="center">
                                  {/* Label for 'On' */}
                                  On the:
                                  <Select
                                    labelId="day-of-week-select-label"
                                    id="day-of-week-select"
                                    value={selectedWeekNumber}
                                    label="Day of Week"
                                    onChange={handleWeekNumberChange}
                                  >
                                    <MenuItem value="first">First</MenuItem>
                                    <MenuItem value="second">Second</MenuItem>
                                    <MenuItem value="third">Third</MenuItem>
                                    <MenuItem value="fourth">Fourth</MenuItem>
                                    <MenuItem value="fifth">Fifth</MenuItem>
                                  </Select>
                                  <Select
                                    labelId="day-of-week-select-label"
                                    id="day-of-week-select"
                                    value={selectedDayOfWeek}
                                    label="Day of Week"
                                    onChange={handleDayOfWeekChange}
                                  >
                                    <MenuItem value="monday">Monday</MenuItem>
                                    <MenuItem value="tuesday">Tuesday</MenuItem>
                                    <MenuItem value="wednesday">
                                      Wednesday
                                    </MenuItem>
                                    <MenuItem value="thursday">
                                      Thursday
                                    </MenuItem>
                                    <MenuItem value="friday">Friday</MenuItem>
                                    <MenuItem value="saturday">
                                      Saturday
                                    </MenuItem>
                                    <MenuItem value="sunday">Sunday</MenuItem>
                                  </Select>
                                  of
                                  {/* Month Dropdown */}
                                  <Select
                                    labelId="month-select-label"
                                    id="month-select"
                                    value={selectedMonth}
                                    onChange={handleMonthChange}
                                  >
                                    <MenuItem value="january">January</MenuItem>
                                    <MenuItem value="february">
                                      February
                                    </MenuItem>
                                    <MenuItem value="march">March</MenuItem>
                                    <MenuItem value="april">April</MenuItem>
                                    <MenuItem value="may">May</MenuItem>
                                    <MenuItem value="june">June</MenuItem>
                                    <MenuItem value="july">July</MenuItem>
                                    <MenuItem value="august">August</MenuItem>
                                    <MenuItem value="september">
                                      September
                                    </MenuItem>
                                    <MenuItem value="october">October</MenuItem>
                                    <MenuItem value="november">
                                      November
                                    </MenuItem>
                                    <MenuItem value="december">
                                      December
                                    </MenuItem>
                                  </Select>
                                </Box>
                              }
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    N
                    start Date , end date
                  </Grid>
                  {/* Add Divider between Grid items */}
                </Grid>
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button type="submit">Ok</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
        <Fab
          size="medium"
          color="primary"
          aria-label="add"
          onClick={handleClickOpen}
        >
          <AddIcon />
        </Fab>
      </div>
    </main>
  );
}
