"""empty message

Revision ID: be3ff6b8d76a
Revises: 689a643e37d1
Create Date: 2023-11-08 18:52:33.119617

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'be3ff6b8d76a'
down_revision = '689a643e37d1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('project', schema=None) as batch_op:
        batch_op.add_column(sa.Column('admon_id', sa.Integer(), nullable=False))
        batch_op.create_foreign_key(None, 'administrator', ['admon_id'], ['id'])

    with op.batch_alter_table('specialist', schema=None) as batch_op:
        batch_op.add_column(sa.Column('administrator_id', sa.Integer(), nullable=False))
        batch_op.create_foreign_key(None, 'administrator', ['administrator_id'], ['id'])

    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('username', sa.String(length=120), nullable=False))
        batch_op.create_unique_constraint(None, ['username'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_column('username')

    with op.batch_alter_table('specialist', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('administrator_id')

    with op.batch_alter_table('project', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('admon_id')

    # ### end Alembic commands ###