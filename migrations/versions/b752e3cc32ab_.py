"""empty message

Revision ID: b752e3cc32ab
Revises: fbdd22ba8e28
Create Date: 2023-11-06 16:48:16.134484

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b752e3cc32ab'
down_revision = 'fbdd22ba8e28'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('specialist', schema=None) as batch_op:
        batch_op.add_column(sa.Column('area_de_desempeno', sa.String(length=120), nullable=False))
        batch_op.drop_column('area_de_desempeño')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('specialist', schema=None) as batch_op:
        batch_op.add_column(sa.Column('area_de_desempeño', sa.VARCHAR(length=120), autoincrement=False, nullable=False))
        batch_op.drop_column('area_de_desempeno')

    # ### end Alembic commands ###