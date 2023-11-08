"""empty message

Revision ID: 689a643e37d1
Revises: e0addcd23681
Create Date: 2023-11-08 01:32:06.805875

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '689a643e37d1'
down_revision = 'e0addcd23681'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('administrator', schema=None) as batch_op:
        batch_op.alter_column('password',
               existing_type=sa.VARCHAR(length=10),
               type_=sa.String(length=100),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('administrator', schema=None) as batch_op:
        batch_op.alter_column('password',
               existing_type=sa.String(length=100),
               type_=sa.VARCHAR(length=10),
               existing_nullable=False)

    # ### end Alembic commands ###