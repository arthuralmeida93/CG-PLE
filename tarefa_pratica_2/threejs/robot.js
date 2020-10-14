// Function to generate robot
// The strategy below is just a suggestion, you may change the shapes to create your customized robot

function gen_robot() {
  // Creating Group (not necessary, but better readability)
  var robot = new THREE.Group();

  // torso
  var torso = gen_rect(4, 8, 0xc2bcba);
  torso.name = "torso";

  // head
  var head = gen_circle(1.6, 30, 0xe8c2a0);
  head.name = "head";
  head.position.y = 6;
  head.position.z = -1;  // Not necessary, makes head not in front of other robot parts

  // left: upper arm, arm, hand
  var left_upper_arm = gen_rect(1.5, 4, 0xdb8437);
    left_upper_arm.name = "left_upper_arm";
  var left_lower_arm = gen_rect(1, 3, 0xe8c2a0);
    left_lower_arm.name = "lower_arm";
  var left_hand = gen_rect(1.5,0.5);
    left_hand.name = "hand";

  left_upper_arm.add(left_lower_arm);
  left_lower_arm.add(left_hand);

  left_hand.position.y = -1.5;
  left_lower_arm.position.y = -3;
  left_upper_arm.position.x = -3;
  left_upper_arm.position.y = 2;

  // right: upper arm, arm, hand
  var right_upper_arm = left_upper_arm.clone();
  right_upper_arm.name = "right_upper_arm";
  right_upper_arm.position.x = 3;

  // left: upper leg, leg, foot
  var left_upper_leg = gen_rect(1.8,5, 0x7d4836);
    left_upper_leg.name = 'left_upper_leg';
  var left_lower_leg = gen_rect(1.5,3, 0xe8c2a0);
    left_lower_leg.name = 'lower_leg';
  var left_foot = gen_rect(1.5,0.5, 0x067dd1);
    left_foot.name = 'foot';

  left_upper_leg.add(left_lower_leg);
  left_lower_leg.add(left_foot);

  left_upper_leg.position.y = -6.5;
  left_upper_leg.position.x = -1;
  left_lower_leg.position.y = -4;
  left_foot.position.y = -2;

  // right: upper leg, leg, foot
  var right_upper_leg = left_upper_leg.clone();
  right_upper_leg.name = 'right_upper_leg';
  right_upper_leg.position.x = 1;

  // Creating hierarchy
  robot.add(torso);
  torso.add(head);
  torso.add(left_upper_arm);
  torso.add(right_upper_arm);
  torso.add(left_upper_leg);
  torso.add(right_upper_leg);

  robot.name = "robot";
  return robot;
}

