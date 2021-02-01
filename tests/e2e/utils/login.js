export default function login () {
  cy.visit('/dist');

  cy.waitUntil(() => cy.get('.el-input__inner'));
  cy.get('.el-dialog__body .el-input__inner').first().type('admin');
  cy.get('.el-dialog__body .el-input__inner').eq(1).type('admin');
  cy.get('.tab-cancel:first').click();
  cy.get('.el-dialog__body .el-button--primary').first().click();
}