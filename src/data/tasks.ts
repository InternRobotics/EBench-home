export type TaskGroup = "long_horizon" | "simple_pnp" | "teleop";

export interface Task {
  display: string;
  canon: string; // matches video filename stem: `${canon}_${view}.mp4`
  group: TaskGroup;
  instruction: string;
}

export const GROUP_LABEL: Record<TaskGroup, string> = {
  long_horizon: "Mobile long-horizon",
  simple_pnp: "Mobile pick-and-place",
  teleop: "Table-top dexterous & precise",
};

export const GROUP_SHORT: Record<TaskGroup, string> = {
  long_horizon: "Long-horizon",
  simple_pnp: "Pick & place",
  teleop: "Dexterous",
};

export const GROUP_ACCENT: Record<TaskGroup, string> = {
  long_horizon: "#9381FF",
  simple_pnp: "#FF8FA3",
  teleop: "#FFD670",
};

export const VIEWS = [
  { key: "left", label: "Left wrist" },
  { key: "top", label: "Head" },
  { key: "right", label: "Right wrist" },
] as const;

export const TASKS: Task[] = [
  { display: "Bottle pack", canon: "bottle", group: "long_horizon", instruction: "Sort all the bottles into the basket." },
  { display: "Detergent retrieval", canon: "detergent", group: "long_horizon", instruction: "Put all the detergents into the basket." },
  { display: "Dish prep", canon: "dish", group: "long_horizon", instruction: "Put all the dishes into the big basket and the spoon into the small basket." },
  { display: "Dishwasher loading", canon: "dishwasher", group: "long_horizon", instruction: "Put all the bowls into the dishwasher." },
  { display: "Fruit milkshake", canon: "fruit", group: "long_horizon", instruction: "Make a fruit milkshake in the cup." },
  { display: "Make sandwich", canon: "make_sandwich", group: "long_horizon", instruction: "Make a sandwich in the plate." },
  { display: "Microwave", canon: "microwave", group: "long_horizon", instruction: "Heat the eggtart with the microwave." },
  { display: "Pen organize", canon: "pen", group: "long_horizon", instruction: "Put the pens in the penholder." },
  { display: "Shop checkout", canon: "shop", group: "long_horizon", instruction: "Scan every item at the checkout counter." },
  { display: "Apple from shelf", canon: "apple_from_shelf", group: "simple_pnp", instruction: "Pick up the apple with price $0.99 from the shelf and take it out." },
  { display: "Apple to fruit bowl", canon: "apple_to_fruit_bowl", group: "simple_pnp", instruction: "Pick up the apple from the dining table and place it into the fruit bowl." },
  { display: "Bookmark on book", canon: "bookmark_on_book", group: "simple_pnp", instruction: "Put the bookmark on the top of the book." },
  { display: "Bowl to plate", canon: "bowl_to_plate", group: "simple_pnp", instruction: "Take out one of the three bowls and stack on the plate." },
  { display: "Perfume to rack", canon: "perfume_to_cosmetics_rack", group: "simple_pnp", instruction: "Pick up the perfume from the vanity table and place it into the cosmetics rack." },
  { display: "Remote to holder", canon: "remote_to_holder", group: "simple_pnp", instruction: "Pick up the remote control from the coffee table and place it into the remote control holder." },
  { display: "Salt to spice rack", canon: "salt_to_spice_rack", group: "simple_pnp", instruction: "Pick up the salt from the countertop and place it into the spice rack." },
  { display: "Soap to dish", canon: "soap_to_dish", group: "simple_pnp", instruction: "Pick up the bar of soap from the bathtub edge and place it into the soap dish." },
  { display: "Teacup & teapot", canon: "teacup_to_saucer_teapot_to_tray", group: "simple_pnp", instruction: "Pick up the teacup on the desk and place it into the empty saucer. Then pick up the teapot and place it into the tray." },
  { display: "Utensils to holder", canon: "utensils_to_holder", group: "simple_pnp", instruction: "Pick up the fork and spoon from the countertop and place them into the utensil holder." },
  { display: "Collect coffee beans", canon: "collect_coffee_beans", group: "teleop", instruction: "Put all the coffee beans into the jar and then close it with the lid." },
  { display: "Flip cup, collect cookies", canon: "flip_cup_collect_cookies", group: "teleop", instruction: "Flip the cup so that the opening faces upward, then pour all the cookies into the bowl." },
  { display: "Frame on pen holder", canon: "frame_against_pen_holder", group: "teleop", instruction: "Stand the picture frame upright on the table with its back against the cup." },
  { display: "Install gear", canon: "install_gear", group: "teleop", instruction: "Install the gear in the appropriate position." },
  { display: "Peg in hole", canon: "peg_in_hole", group: "teleop", instruction: "Pick up the peg and the hole simultaneously, insert the peg into the hole, and place them back on the table." },
  { display: "Put glass in glassbox", canon: "put_glass_in_glassbox", group: "teleop", instruction: "Please put the glass into the glass box carefully." },
  { display: "Tighten nut", canon: "tighten_nut", group: "teleop", instruction: "Screw the nut onto the bolt." },
];
