/*
 Navicat Premium Data Transfer

 Source Server         : laragon
 Source Server Type    : MySQL
 Source Server Version : 80408
 Source Host           : localhost:3306
 Source Schema         : exercise_db

 Target Server Type    : MySQL
 Target Server Version : 80408
 File Encoding         : 65001

 Date: 02/03/2026 12:15:56
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for grade
-- ----------------------------
DROP TABLE IF EXISTS `grade`;
CREATE TABLE `grade`  (
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `student_uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `school_subject_uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `grade_value` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`uuid`) USING BTREE,
  INDEX `student_uuid`(`student_uuid` ASC) USING BTREE,
  INDEX `school_subject_uuid`(`school_subject_uuid` ASC) USING BTREE,
  CONSTRAINT `grade_ibfk_1` FOREIGN KEY (`student_uuid`) REFERENCES `student` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `grade_ibfk_2` FOREIGN KEY (`school_subject_uuid`) REFERENCES `school_subject` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of grade
-- ----------------------------
INSERT INTO `grade` VALUES ('c9177e3c-15f3-11f1-9f09-38f3abec732f', 'a03cffc4-15f1-11f1-9f09-38f3abec732f', '2ead571b-15f2-11f1-9f09-38f3abec732f', 'C');
INSERT INTO `grade` VALUES ('c9178680-15f3-11f1-9f09-38f3abec732f', 'a03cffc4-15f1-11f1-9f09-38f3abec732f', '2ead544b-15f2-11f1-9f09-38f3abec732f', 'A');
INSERT INTO `grade` VALUES ('c9178805-15f3-11f1-9f09-38f3abec732f', 'a03cffc4-15f1-11f1-9f09-38f3abec732f', '2ead4e33-15f2-11f1-9f09-38f3abec732f', 'B');
INSERT INTO `grade` VALUES ('c91788c4-15f3-11f1-9f09-38f3abec732f', 'a03cffc4-15f1-11f1-9f09-38f3abec732f', '2ead556e-15f2-11f1-9f09-38f3abec732f', 'A');
INSERT INTO `grade` VALUES ('c917897a-15f3-11f1-9f09-38f3abec732f', 'a03cffc4-15f1-11f1-9f09-38f3abec732f', '2ead5652-15f2-11f1-9f09-38f3abec732f', 'E');
INSERT INTO `grade` VALUES ('c9178a38-15f3-11f1-9f09-38f3abec732f', 'a03cffc4-15f1-11f1-9f09-38f3abec732f', '2ead56b9-15f2-11f1-9f09-38f3abec732f', 'B');
INSERT INTO `grade` VALUES ('c9178c70-15f3-11f1-9f09-38f3abec732f', 'a03cffc4-15f1-11f1-9f09-38f3abec732f', '2ead55e6-15f2-11f1-9f09-38f3abec732f', 'D');
INSERT INTO `grade` VALUES ('c9178d19-15f3-11f1-9f09-38f3abec732f', 'a03cffc4-15f1-11f1-9f09-38f3abec732f', '2ead57a8-15f2-11f1-9f09-38f3abec732f', 'E');
INSERT INTO `grade` VALUES ('c9178de0-15f3-11f1-9f09-38f3abec732f', 'a03cfe81-15f1-11f1-9f09-38f3abec732f', '2ead571b-15f2-11f1-9f09-38f3abec732f', 'D');
INSERT INTO `grade` VALUES ('c9178e94-15f3-11f1-9f09-38f3abec732f', 'a03cfe81-15f1-11f1-9f09-38f3abec732f', '2ead544b-15f2-11f1-9f09-38f3abec732f', 'B');
INSERT INTO `grade` VALUES ('c9178f4d-15f3-11f1-9f09-38f3abec732f', 'a03cfe81-15f1-11f1-9f09-38f3abec732f', '2ead4e33-15f2-11f1-9f09-38f3abec732f', 'A');
INSERT INTO `grade` VALUES ('c9179024-15f3-11f1-9f09-38f3abec732f', 'a03cfe81-15f1-11f1-9f09-38f3abec732f', '2ead556e-15f2-11f1-9f09-38f3abec732f', 'A');
INSERT INTO `grade` VALUES ('c91790cc-15f3-11f1-9f09-38f3abec732f', 'a03cfe81-15f1-11f1-9f09-38f3abec732f', '2ead5652-15f2-11f1-9f09-38f3abec732f', 'C');
INSERT INTO `grade` VALUES ('c917919c-15f3-11f1-9f09-38f3abec732f', 'a03cfe81-15f1-11f1-9f09-38f3abec732f', '2ead56b9-15f2-11f1-9f09-38f3abec732f', 'E');
INSERT INTO `grade` VALUES ('c9179300-15f3-11f1-9f09-38f3abec732f', 'a03cfe81-15f1-11f1-9f09-38f3abec732f', '2ead55e6-15f2-11f1-9f09-38f3abec732f', 'C');
INSERT INTO `grade` VALUES ('c91793b5-15f3-11f1-9f09-38f3abec732f', 'a03cfe81-15f1-11f1-9f09-38f3abec732f', '2ead57a8-15f2-11f1-9f09-38f3abec732f', 'E');
INSERT INTO `grade` VALUES ('c9179480-15f3-11f1-9f09-38f3abec732f', 'a03cf57e-15f1-11f1-9f09-38f3abec732f', '2ead571b-15f2-11f1-9f09-38f3abec732f', 'B');
INSERT INTO `grade` VALUES ('c917953c-15f3-11f1-9f09-38f3abec732f', 'a03cf57e-15f1-11f1-9f09-38f3abec732f', '2ead544b-15f2-11f1-9f09-38f3abec732f', 'D');
INSERT INTO `grade` VALUES ('c91795f0-15f3-11f1-9f09-38f3abec732f', 'a03cf57e-15f1-11f1-9f09-38f3abec732f', '2ead4e33-15f2-11f1-9f09-38f3abec732f', 'D');
INSERT INTO `grade` VALUES ('c91796a7-15f3-11f1-9f09-38f3abec732f', 'a03cf57e-15f1-11f1-9f09-38f3abec732f', '2ead556e-15f2-11f1-9f09-38f3abec732f', 'E');
INSERT INTO `grade` VALUES ('c917978b-15f3-11f1-9f09-38f3abec732f', 'a03cf57e-15f1-11f1-9f09-38f3abec732f', '2ead5652-15f2-11f1-9f09-38f3abec732f', 'D');
INSERT INTO `grade` VALUES ('c9179859-15f3-11f1-9f09-38f3abec732f', 'a03cf57e-15f1-11f1-9f09-38f3abec732f', '2ead56b9-15f2-11f1-9f09-38f3abec732f', 'E');
INSERT INTO `grade` VALUES ('c91798fc-15f3-11f1-9f09-38f3abec732f', 'a03cf57e-15f1-11f1-9f09-38f3abec732f', '2ead55e6-15f2-11f1-9f09-38f3abec732f', 'A');
INSERT INTO `grade` VALUES ('c91799c6-15f3-11f1-9f09-38f3abec732f', 'a03cf57e-15f1-11f1-9f09-38f3abec732f', '2ead57a8-15f2-11f1-9f09-38f3abec732f', 'A');
INSERT INTO `grade` VALUES ('c9179a9a-15f3-11f1-9f09-38f3abec732f', 'a03cfbd6-15f1-11f1-9f09-38f3abec732f', '2ead571b-15f2-11f1-9f09-38f3abec732f', 'A');
INSERT INTO `grade` VALUES ('c9179b40-15f3-11f1-9f09-38f3abec732f', 'a03cfbd6-15f1-11f1-9f09-38f3abec732f', '2ead544b-15f2-11f1-9f09-38f3abec732f', 'B');
INSERT INTO `grade` VALUES ('c9179bdf-15f3-11f1-9f09-38f3abec732f', 'a03cfbd6-15f1-11f1-9f09-38f3abec732f', '2ead4e33-15f2-11f1-9f09-38f3abec732f', 'A');
INSERT INTO `grade` VALUES ('c9179c8e-15f3-11f1-9f09-38f3abec732f', 'a03cfbd6-15f1-11f1-9f09-38f3abec732f', '2ead556e-15f2-11f1-9f09-38f3abec732f', 'D');
INSERT INTO `grade` VALUES ('c9179d39-15f3-11f1-9f09-38f3abec732f', 'a03cfbd6-15f1-11f1-9f09-38f3abec732f', '2ead5652-15f2-11f1-9f09-38f3abec732f', 'D');
INSERT INTO `grade` VALUES ('c9179ddb-15f3-11f1-9f09-38f3abec732f', 'a03cfbd6-15f1-11f1-9f09-38f3abec732f', '2ead56b9-15f2-11f1-9f09-38f3abec732f', 'E');
INSERT INTO `grade` VALUES ('c9179e7c-15f3-11f1-9f09-38f3abec732f', 'a03cfbd6-15f1-11f1-9f09-38f3abec732f', '2ead55e6-15f2-11f1-9f09-38f3abec732f', 'A');
INSERT INTO `grade` VALUES ('c9179f37-15f3-11f1-9f09-38f3abec732f', 'a03cfbd6-15f1-11f1-9f09-38f3abec732f', '2ead57a8-15f2-11f1-9f09-38f3abec732f', 'E');
INSERT INTO `grade` VALUES ('c9179fef-15f3-11f1-9f09-38f3abec732f', 'a03cfd1e-15f1-11f1-9f09-38f3abec732f', '2ead571b-15f2-11f1-9f09-38f3abec732f', 'C');
INSERT INTO `grade` VALUES ('c917a0b6-15f3-11f1-9f09-38f3abec732f', 'a03cfd1e-15f1-11f1-9f09-38f3abec732f', '2ead544b-15f2-11f1-9f09-38f3abec732f', 'C');
INSERT INTO `grade` VALUES ('c917a18e-15f3-11f1-9f09-38f3abec732f', 'a03cfd1e-15f1-11f1-9f09-38f3abec732f', '2ead4e33-15f2-11f1-9f09-38f3abec732f', 'A');
INSERT INTO `grade` VALUES ('c917a233-15f3-11f1-9f09-38f3abec732f', 'a03cfd1e-15f1-11f1-9f09-38f3abec732f', '2ead556e-15f2-11f1-9f09-38f3abec732f', 'A');
INSERT INTO `grade` VALUES ('c917a2ec-15f3-11f1-9f09-38f3abec732f', 'a03cfd1e-15f1-11f1-9f09-38f3abec732f', '2ead5652-15f2-11f1-9f09-38f3abec732f', 'A');
INSERT INTO `grade` VALUES ('c917a398-15f3-11f1-9f09-38f3abec732f', 'a03cfd1e-15f1-11f1-9f09-38f3abec732f', '2ead56b9-15f2-11f1-9f09-38f3abec732f', 'C');
INSERT INTO `grade` VALUES ('c917a53b-15f3-11f1-9f09-38f3abec732f', 'a03cfd1e-15f1-11f1-9f09-38f3abec732f', '2ead55e6-15f2-11f1-9f09-38f3abec732f', 'C');
INSERT INTO `grade` VALUES ('c917a60e-15f3-11f1-9f09-38f3abec732f', 'a03cfd1e-15f1-11f1-9f09-38f3abec732f', '2ead57a8-15f2-11f1-9f09-38f3abec732f', 'B');
INSERT INTO `grade` VALUES ('c917a6cf-15f3-11f1-9f09-38f3abec732f', 'a03cfd9d-15f1-11f1-9f09-38f3abec732f', '2ead571b-15f2-11f1-9f09-38f3abec732f', 'B');
INSERT INTO `grade` VALUES ('c917a7ba-15f3-11f1-9f09-38f3abec732f', 'a03cfd9d-15f1-11f1-9f09-38f3abec732f', '2ead544b-15f2-11f1-9f09-38f3abec732f', 'A');
INSERT INTO `grade` VALUES ('c917a86d-15f3-11f1-9f09-38f3abec732f', 'a03cfd9d-15f1-11f1-9f09-38f3abec732f', '2ead4e33-15f2-11f1-9f09-38f3abec732f', 'B');
INSERT INTO `grade` VALUES ('c917a916-15f3-11f1-9f09-38f3abec732f', 'a03cfd9d-15f1-11f1-9f09-38f3abec732f', '2ead556e-15f2-11f1-9f09-38f3abec732f', 'D');
INSERT INTO `grade` VALUES ('c917a9c0-15f3-11f1-9f09-38f3abec732f', 'a03cfd9d-15f1-11f1-9f09-38f3abec732f', '2ead5652-15f2-11f1-9f09-38f3abec732f', 'E');
INSERT INTO `grade` VALUES ('c917aa69-15f3-11f1-9f09-38f3abec732f', 'a03cfd9d-15f1-11f1-9f09-38f3abec732f', '2ead56b9-15f2-11f1-9f09-38f3abec732f', 'A');
INSERT INTO `grade` VALUES ('c917ab1e-15f3-11f1-9f09-38f3abec732f', 'a03cfd9d-15f1-11f1-9f09-38f3abec732f', '2ead55e6-15f2-11f1-9f09-38f3abec732f', 'C');
INSERT INTO `grade` VALUES ('c917abcb-15f3-11f1-9f09-38f3abec732f', 'a03cfd9d-15f1-11f1-9f09-38f3abec732f', '2ead57a8-15f2-11f1-9f09-38f3abec732f', 'D');
INSERT INTO `grade` VALUES ('c917ac81-15f3-11f1-9f09-38f3abec732f', 'a03cfe0b-15f1-11f1-9f09-38f3abec732f', '2ead571b-15f2-11f1-9f09-38f3abec732f', 'B');
INSERT INTO `grade` VALUES ('c917ad28-15f3-11f1-9f09-38f3abec732f', 'a03cfe0b-15f1-11f1-9f09-38f3abec732f', '2ead544b-15f2-11f1-9f09-38f3abec732f', 'D');
INSERT INTO `grade` VALUES ('c917adf4-15f3-11f1-9f09-38f3abec732f', 'a03cfe0b-15f1-11f1-9f09-38f3abec732f', '2ead4e33-15f2-11f1-9f09-38f3abec732f', 'A');
INSERT INTO `grade` VALUES ('c917ae9e-15f3-11f1-9f09-38f3abec732f', 'a03cfe0b-15f1-11f1-9f09-38f3abec732f', '2ead556e-15f2-11f1-9f09-38f3abec732f', 'A');
INSERT INTO `grade` VALUES ('c917af48-15f3-11f1-9f09-38f3abec732f', 'a03cfe0b-15f1-11f1-9f09-38f3abec732f', '2ead5652-15f2-11f1-9f09-38f3abec732f', 'E');
INSERT INTO `grade` VALUES ('c917b05a-15f3-11f1-9f09-38f3abec732f', 'a03cfe0b-15f1-11f1-9f09-38f3abec732f', '2ead56b9-15f2-11f1-9f09-38f3abec732f', 'C');
INSERT INTO `grade` VALUES ('c917b124-15f3-11f1-9f09-38f3abec732f', 'a03cfe0b-15f1-11f1-9f09-38f3abec732f', '2ead55e6-15f2-11f1-9f09-38f3abec732f', 'E');
INSERT INTO `grade` VALUES ('c917b1d3-15f3-11f1-9f09-38f3abec732f', 'a03cfe0b-15f1-11f1-9f09-38f3abec732f', '2ead57a8-15f2-11f1-9f09-38f3abec732f', 'A');
INSERT INTO `grade` VALUES ('c917b2ca-15f3-11f1-9f09-38f3abec732f', 'a03cfee7-15f1-11f1-9f09-38f3abec732f', '2ead571b-15f2-11f1-9f09-38f3abec732f', 'D');
INSERT INTO `grade` VALUES ('c917b39c-15f3-11f1-9f09-38f3abec732f', 'a03cfee7-15f1-11f1-9f09-38f3abec732f', '2ead544b-15f2-11f1-9f09-38f3abec732f', 'A');
INSERT INTO `grade` VALUES ('c917b459-15f3-11f1-9f09-38f3abec732f', 'a03cfee7-15f1-11f1-9f09-38f3abec732f', '2ead4e33-15f2-11f1-9f09-38f3abec732f', 'C');
INSERT INTO `grade` VALUES ('c917b510-15f3-11f1-9f09-38f3abec732f', 'a03cfee7-15f1-11f1-9f09-38f3abec732f', '2ead556e-15f2-11f1-9f09-38f3abec732f', 'E');
INSERT INTO `grade` VALUES ('c917b5c9-15f3-11f1-9f09-38f3abec732f', 'a03cfee7-15f1-11f1-9f09-38f3abec732f', '2ead5652-15f2-11f1-9f09-38f3abec732f', 'A');
INSERT INTO `grade` VALUES ('c917b6a2-15f3-11f1-9f09-38f3abec732f', 'a03cfee7-15f1-11f1-9f09-38f3abec732f', '2ead56b9-15f2-11f1-9f09-38f3abec732f', 'A');
INSERT INTO `grade` VALUES ('c917b77d-15f3-11f1-9f09-38f3abec732f', 'a03cfee7-15f1-11f1-9f09-38f3abec732f', '2ead55e6-15f2-11f1-9f09-38f3abec732f', 'D');
INSERT INTO `grade` VALUES ('c917b82e-15f3-11f1-9f09-38f3abec732f', 'a03cfee7-15f1-11f1-9f09-38f3abec732f', '2ead57a8-15f2-11f1-9f09-38f3abec732f', 'D');
INSERT INTO `grade` VALUES ('c917b8ee-15f3-11f1-9f09-38f3abec732f', 'a03d00b9-15f1-11f1-9f09-38f3abec732f', '2ead571b-15f2-11f1-9f09-38f3abec732f', 'B');
INSERT INTO `grade` VALUES ('c917b9aa-15f3-11f1-9f09-38f3abec732f', 'a03d00b9-15f1-11f1-9f09-38f3abec732f', '2ead544b-15f2-11f1-9f09-38f3abec732f', 'B');
INSERT INTO `grade` VALUES ('c917ba8e-15f3-11f1-9f09-38f3abec732f', 'a03d00b9-15f1-11f1-9f09-38f3abec732f', '2ead4e33-15f2-11f1-9f09-38f3abec732f', 'B');
INSERT INTO `grade` VALUES ('c917bbb2-15f3-11f1-9f09-38f3abec732f', 'a03d00b9-15f1-11f1-9f09-38f3abec732f', '2ead556e-15f2-11f1-9f09-38f3abec732f', 'C');
INSERT INTO `grade` VALUES ('c917bcbe-15f3-11f1-9f09-38f3abec732f', 'a03d00b9-15f1-11f1-9f09-38f3abec732f', '2ead5652-15f2-11f1-9f09-38f3abec732f', 'D');
INSERT INTO `grade` VALUES ('c917bd7c-15f3-11f1-9f09-38f3abec732f', 'a03d00b9-15f1-11f1-9f09-38f3abec732f', '2ead56b9-15f2-11f1-9f09-38f3abec732f', 'D');
INSERT INTO `grade` VALUES ('c917be22-15f3-11f1-9f09-38f3abec732f', 'a03d00b9-15f1-11f1-9f09-38f3abec732f', '2ead55e6-15f2-11f1-9f09-38f3abec732f', 'C');
INSERT INTO `grade` VALUES ('c917bed9-15f3-11f1-9f09-38f3abec732f', 'a03d00b9-15f1-11f1-9f09-38f3abec732f', '2ead57a8-15f2-11f1-9f09-38f3abec732f', 'D');
INSERT INTO `grade` VALUES ('c917c076-15f3-11f1-9f09-38f3abec732f', 'a03d004d-15f1-11f1-9f09-38f3abec732f', '2ead571b-15f2-11f1-9f09-38f3abec732f', 'C');
INSERT INTO `grade` VALUES ('c917c14c-15f3-11f1-9f09-38f3abec732f', 'a03d004d-15f1-11f1-9f09-38f3abec732f', '2ead544b-15f2-11f1-9f09-38f3abec732f', 'D');
INSERT INTO `grade` VALUES ('c917c244-15f3-11f1-9f09-38f3abec732f', 'a03d004d-15f1-11f1-9f09-38f3abec732f', '2ead4e33-15f2-11f1-9f09-38f3abec732f', 'D');
INSERT INTO `grade` VALUES ('c917c335-15f3-11f1-9f09-38f3abec732f', 'a03d004d-15f1-11f1-9f09-38f3abec732f', '2ead556e-15f2-11f1-9f09-38f3abec732f', 'E');
INSERT INTO `grade` VALUES ('c917c451-15f3-11f1-9f09-38f3abec732f', 'a03d004d-15f1-11f1-9f09-38f3abec732f', '2ead5652-15f2-11f1-9f09-38f3abec732f', 'E');
INSERT INTO `grade` VALUES ('c917c50c-15f3-11f1-9f09-38f3abec732f', 'a03d004d-15f1-11f1-9f09-38f3abec732f', '2ead56b9-15f2-11f1-9f09-38f3abec732f', 'B');
INSERT INTO `grade` VALUES ('c917c5b8-15f3-11f1-9f09-38f3abec732f', 'a03d004d-15f1-11f1-9f09-38f3abec732f', '2ead55e6-15f2-11f1-9f09-38f3abec732f', 'D');
INSERT INTO `grade` VALUES ('c917c665-15f3-11f1-9f09-38f3abec732f', 'a03d004d-15f1-11f1-9f09-38f3abec732f', '2ead57a8-15f2-11f1-9f09-38f3abec732f', 'D');
INSERT INTO `grade` VALUES ('c917c744-15f3-11f1-9f09-38f3abec732f', 'a03cff5a-15f1-11f1-9f09-38f3abec732f', '2ead571b-15f2-11f1-9f09-38f3abec732f', 'C');
INSERT INTO `grade` VALUES ('c917c7ff-15f3-11f1-9f09-38f3abec732f', 'a03cff5a-15f1-11f1-9f09-38f3abec732f', '2ead544b-15f2-11f1-9f09-38f3abec732f', 'A');
INSERT INTO `grade` VALUES ('c917c8b4-15f3-11f1-9f09-38f3abec732f', 'a03cff5a-15f1-11f1-9f09-38f3abec732f', '2ead4e33-15f2-11f1-9f09-38f3abec732f', 'A');
INSERT INTO `grade` VALUES ('c917c96c-15f3-11f1-9f09-38f3abec732f', 'a03cff5a-15f1-11f1-9f09-38f3abec732f', '2ead556e-15f2-11f1-9f09-38f3abec732f', 'A');
INSERT INTO `grade` VALUES ('c917ca21-15f3-11f1-9f09-38f3abec732f', 'a03cff5a-15f1-11f1-9f09-38f3abec732f', '2ead5652-15f2-11f1-9f09-38f3abec732f', 'A');
INSERT INTO `grade` VALUES ('c917cb07-15f3-11f1-9f09-38f3abec732f', 'a03cff5a-15f1-11f1-9f09-38f3abec732f', '2ead56b9-15f2-11f1-9f09-38f3abec732f', 'B');
INSERT INTO `grade` VALUES ('c917cbdd-15f3-11f1-9f09-38f3abec732f', 'a03cff5a-15f1-11f1-9f09-38f3abec732f', '2ead55e6-15f2-11f1-9f09-38f3abec732f', 'A');
INSERT INTO `grade` VALUES ('c917cd07-15f3-11f1-9f09-38f3abec732f', 'a03cff5a-15f1-11f1-9f09-38f3abec732f', '2ead57a8-15f2-11f1-9f09-38f3abec732f', 'B');

-- ----------------------------
-- Table structure for school_subject
-- ----------------------------
DROP TABLE IF EXISTS `school_subject`;
CREATE TABLE `school_subject`  (
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'uuid()',
  `subject_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`uuid`) USING BTREE,
  UNIQUE INDEX `unique_subject_name`(`subject_name` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of school_subject
-- ----------------------------
INSERT INTO `school_subject` VALUES ('2ead57a8-15f2-11f1-9f09-38f3abec732f', 'Artificial Intelligent');
INSERT INTO `school_subject` VALUES ('2ead55e6-15f2-11f1-9f09-38f3abec732f', 'Bahasa Indonesia');
INSERT INTO `school_subject` VALUES ('2ead56b9-15f2-11f1-9f09-38f3abec732f', 'Bahasa Jerman');
INSERT INTO `school_subject` VALUES ('2ead5652-15f2-11f1-9f09-38f3abec732f', 'Bahasa Mandarin');
INSERT INTO `school_subject` VALUES ('2ead556e-15f2-11f1-9f09-38f3abec732f', 'Biologi');
INSERT INTO `school_subject` VALUES ('2ead4e33-15f2-11f1-9f09-38f3abec732f', 'Fisika');
INSERT INTO `school_subject` VALUES ('2ead544b-15f2-11f1-9f09-38f3abec732f', 'Kimia');
INSERT INTO `school_subject` VALUES ('2ead571b-15f2-11f1-9f09-38f3abec732f', 'Matematika');

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'uuid()',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `gender` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  PRIMARY KEY (`uuid`) USING BTREE,
  UNIQUE INDEX `unique_student_name`(`name` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('a03cf57e-15f1-11f1-9f09-38f3abec732f', 'Andi', 'Male', 'Bekasi');
INSERT INTO `student` VALUES ('a03cfbd6-15f1-11f1-9f09-38f3abec732f', 'Budi', 'Male', 'Jakarta');
INSERT INTO `student` VALUES ('a03cfd1e-15f1-11f1-9f09-38f3abec732f', 'Citra', 'Female', 'Bandung');
INSERT INTO `student` VALUES ('a03cfd9d-15f1-11f1-9f09-38f3abec732f', 'Deni', 'Male', 'Bogor');
INSERT INTO `student` VALUES ('a03cfe0b-15f1-11f1-9f09-38f3abec732f', 'Eka', 'Female', 'Depok');
INSERT INTO `student` VALUES ('a03cfe81-15f1-11f1-9f09-38f3abec732f', 'Adi', 'Male', 'Kebun Jeruk');
INSERT INTO `student` VALUES ('a03cfee7-15f1-11f1-9f09-38f3abec732f', 'Kuntum', 'Female', 'Kebun Jeruk');
INSERT INTO `student` VALUES ('a03cff5a-15f1-11f1-9f09-38f3abec732f', 'Resa', 'Female', 'Depok');
INSERT INTO `student` VALUES ('a03cffc4-15f1-11f1-9f09-38f3abec732f', 'Ade', 'Male', 'Depok');
INSERT INTO `student` VALUES ('a03d004d-15f1-11f1-9f09-38f3abec732f', 'Rafi', 'Male', 'Padang');
INSERT INTO `student` VALUES ('a03d00b9-15f1-11f1-9f09-38f3abec732f', 'Mita', 'Female', 'Padang');

SET FOREIGN_KEY_CHECKS = 1;
